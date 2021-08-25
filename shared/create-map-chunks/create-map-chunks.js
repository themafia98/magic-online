const fs = require('fs');
const path = require("path");
const clone = require("clone");

function splitMap(fileName,out,chunkWidth,chunkHeight){
  const defaultChunkWidth = 20;
  const defaultChunkHeight = 20;

  if(!fileName){
    console.log('ERROR : No file name specified!');
    console.log('-i = path to JSON file of the map to split, relative to assets/map (with or without out json extension)');
    console.log('-o = (optional) name of directory where chunks have to be generated (default assets/map/chunks)');
    console.log('-w = (optional) width of the chunks, in tiles (default '+defaultChunkWidth+')');
    console.log('-h = (optional) height of the chunks, in tiles (default '+defaultChunkHeight+')');
    return;
  }
  if(fileName.substr(-5) == ".json") fileName = fileName.slice(0,-5);

  if(!out) out = 'chunks';
  var mapsPath = path.join('./', 'assets');
  var outputDirectory = path.join(__dirname,mapsPath,out);
  if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);

  if(!chunkWidth) chunkWidth = defaultChunkWidth;
  if(!chunkHeight) chunkHeight = defaultChunkHeight;

  fs.readFile(path.join(__dirname,mapsPath,fileName+".json"), 'utf8', function (err, data) {
    if (err) throw err;
    const map = JSON.parse(data);
    const mapWidth = map.width;
    const mapHeight = map.height;
    const nbChunksHorizontal = Math.ceil(mapWidth/chunkWidth);
    const nbChunksVertical = Math.ceil(mapHeight/chunkHeight);
    const nbChunks = nbChunksHorizontal*nbChunksVertical;
    console.log('Splitting into '+nbChunks+' chunks ('+nbChunksHorizontal+' x '+nbChunksVertical+') of size ('+chunkWidth+' x '+chunkHeight+')');
    console.log('Writing to '+outputDirectory);

    // Creates a master file that contains information needed to properly manage the chunks
    const master = {
      tilesets: map.tilesets, // Up to you to decide if having the tilesets data in the master file is useful or not, adapt accordingly (in this case it's not)
      chunkWidth: chunkWidth,
      chunkHeight: chunkHeight,
      nbChunksHorizontal: nbChunksHorizontal,
      nbChunksVertical: nbChunksVertical,
      nbLayers: map.layers.length
    };
    fs.writeFile(path.join(outputDirectory,'master.json'),JSON.stringify(master),function(err){
      if(err) throw err;
      console.log('Master file written');
    });

    let counter = 0;

    for(let i = 0; i < nbChunks; i++){
      const chunk = clone(map);

      // Compute the coordinates of the top-left corner of the chunk in the initial map
      const x = (i%nbChunksHorizontal)*chunkWidth;
      const y = Math.floor(i/nbChunksHorizontal)*chunkHeight;
      chunk.width = Math.min(chunkWidth,mapWidth-x);
      chunk.height = Math.min(chunkHeight,mapHeight-y);
      chunk.id = i;

      // Compute the index of the tiles array of the initial map that corresponds to the top-left tile of the chunk
      const liststart = mapWidth*y + x;

      for(let j= 0; j < chunk.layers.length; j++) { // Scan all layers one by one
        const layer = chunk.layers[j];

        layer.width = chunk.width;
        layer.height = chunk.height;

        if (layer.type === "tilelayer") {
          let tmpdata = [];

          // In the initial tiles array, fetch the "slices" of tiles that belong to the chunk of interest
          for(let yi = 0; yi < layer.height; yi++){
            const begin = liststart + yi*mapWidth;
            const end = begin+layer.width;
            const line = layer.data.slice(begin,end);
            tmpdata = tmpdata.concat(line);
          }
          layer.data = tmpdata;
        }
      }

      // Update tileset paths
      for(let k = 0; k < chunk.tilesets.length; k++){
        const tileset = chunk.tilesets[k];
        tileset.image = path.join('..',tileset.image);
      }

      fs.writeFile(path.join(outputDirectory,'chunk'+i+'.json'),JSON.stringify(chunk),function(err){
        if(err) throw err;
        counter++;
        if(counter == nbChunks) console.log('All chunks created');
      });
    }
  });
}

var myArgs = require('optimist').argv;
splitMap(myArgs.i,myArgs.o,myArgs.w,myArgs.h);
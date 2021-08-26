import { channelType, DOMAIN_TYPE } from './Domain.constant';
import { WEBSOCKET_CUSTOM_URL } from '../../app.constant';

export interface IDomain {
  api: string;
  type: channelType;
}

class Domain implements IDomain {
  private readonly domainType: channelType;
  private readonly apiUrl: string;

  constructor(domainType: channelType) {
    this.domainType = domainType;
    this.apiUrl =
      this.domainType === DOMAIN_TYPE.HTTP ? `${location.origin}${process.env.API_V1}` : WEBSOCKET_CUSTOM_URL;
  }

  get api() {
    return this.apiUrl;
  }

  get type() {
    return this.domainType;
  }
}

export default Domain;

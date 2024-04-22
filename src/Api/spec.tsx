import { ApiBase } from "./base";

export class SpecApi extends ApiBase {
  constructor() {
    super();
  }

  async getSpecInfo() {
    const result = await this.axios.get(`/f_pers_young_spec`);
    return result.data;
  }

  async getLinesInfo() {
    const result = await this.axios.get(`/nsi_pers_young_spec`);
    return result.data;
  }

  async getDataInfo() {
    const result = await this.axios.get(`/f_pers_young_spec_line`);
    return result.data;
  }

  async getDataLine(id: number) {
    const result = await this.axios.get(`/f_pers_young_spec_line/${id}`);
    return result.data;
  }
}

export default SpecApi;

import { TableData } from "@/Modules/Table/Table";
import { ApiBase } from "./base";
import { TableDataRow } from "@/Modules/Form/Form";

export class SpecApi extends ApiBase {
  constructor() {
    super();
  }

  async getTables() {
    const result = await this.axios.get(`/f_pers_young_spec`);
    return result.data;
  }

  async createTable(data: TableData) {
    const result = await this.axios.post(`/f_pers_young_spec/`, data);
    return result.data;
  }

  async getTablesData(id: number) {
    const result = await this.axios.get(`/f_pers_young_spec/${id}`);
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

  async createDataInfo(data: TableDataRow) {
    const result = await this.axios.post(`/f_pers_young_spec_line/`, data);
    return result.data;
  }

  async getDataLine(id: number) {
    const result = await this.axios.get(`/f_pers_young_spec_line/${id}`);
    return result.data;
  }
}

export default SpecApi;

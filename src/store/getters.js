/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-23 09:03:21
 * @Description:
 */
const getters = {
  getTagView: state => {
    return state.user.tagView;
  },
  yarnInCountData: state => state.whse.yarnInCountData || {},
  chemicalInCountData: state => state.whse.chemicalInCountData || {},
  dyesInCountData: state => state.whse.dyesInCountData || {},
  accInCountData: state => state.whse.accInCountData || {},
  hardInCountData: state => state.whse.hardInCountData || {},
  officeInCountData: state => state.whse.officeInCountData || {},
  engInCountData: state => state.whse.engInCountData || {},
  equInCountData: state => state.whse.equInCountData || {},

  unOutCountData: state => state.whse.unOutCountDataList || [],

};
export default getters
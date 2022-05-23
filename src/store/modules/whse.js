/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-19 16:34:01
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-23 09:02:29
 */
import axios from "axios";

export default {
    namespaced: true,
    state: {
        yarnInCountData:{},
        chemicalInCountData: {},
        dyesInCountData: {},
        accInCountData: {},
        hardInCountData: {},
        officeInCountData: {},
        engInCountData: {},
        equInCountData: {},

        unOutCountDataList: [],
    },
    mutations:{
        SET_YARN_UN_IN_STOCK(state, data){
            state.yarnInCountData = data;
        },
        SET_CHEMICAL_UN_IN_STOCK(state, data){
            state.chemicalInCountData = data;
        },
        SET_DYES_UN_IN_STOCK(state, data){
            state.dyesInCountData = data;
        },
        SET_ACC_UN_IN_STOCK(state, data){
            state.accInCountData = data;
        },
        SET_HARD_UN_IN_STOCK(state, data){
            state.hardInCountData = data;
        },
        SET_OFFICE_UN_IN_STOCK(state, data){
            state.officeInCountData = data;
        },
        SET_ENG_UN_IN_STOCK(state, data){
            state.engInCountData = data;
        },
        SET_EQU_UN_IN_STOCK(state, data){
            state.equInCountData = data;
        },
        SET_UN_OUT_COUNT_DATA_LIST(state, dataList){
            state.unOutCountDataList = dataList;
        }
    },
    actions: {
        async GetUnOutCountDataList({commit}){
            let res = await axios.get("/api/whseManage/unOutCount");
            commit("SET_UN_OUT_COUNT_DATA_LIST",res.data);
        },
        // 纱线
        async GetYarnUnInStockCount({commit}){
            let resData = await axios.get("/api/whseYarnin/unInStock/count");
            commit("SET_YARN_UN_IN_STOCK",resData.data.data)
        },
        // 化工原料
        async GetChemicalUnInStockCount({commit}){
            let resData = await axios.get("/api/whseChemicalin/unInStock/count");
            commit("SET_CHEMICAL_UN_IN_STOCK",resData.data.data)
        },
        // 染料
        async GetDyesUnInStockCount({commit}){
            let resData = await axios.get("/api/whseDyesalin/unInStock/count");
            commit("SET_DYES_UN_IN_STOCK",resData.data.data)
        },
        // 辅料
        async GetAccUnInStockCount({commit}){
            let resData = await axios.get("/api/whseAccessoriesIn/unInStock/count");
            commit("SET_ACC_UN_IN_STOCK",resData.data.data)
        },
        // 五金
        async GetHardUnInStockCount({commit}){
            let resData = await axios.get("/api/whseHardwareIn/unInStock/count");
            commit("SET_HARD_UN_IN_STOCK",resData.data.data)
        },
        // 行政
        async GetOfficenInStockCount({commit}){
            let resData = await axios.get("/api/whseOfficeIn/unInStock/count");
            commit("SET_OFFICE_UN_IN_STOCK",resData.data.data)
        },
        // 能源
        async GetEngInStockCount({commit}){
            let resData = await axios.get("/api/whseEnergyIn/unInStock/count");
            commit("SET_ENG_UN_IN_STOCK",resData.data.data)
        },
        // 设备
        async GetEquInStockCount({commit}){
            let resData = await axios.get("/api/whseEquipmentIn/unInStock/count");
            commit("SET_EQU_UN_IN_STOCK",resData.data.data)
        },
        
        // 刷新数据
        RefreshWhseUnInStockCount({dispatch},type){
            switch(type){
                case 'SX':
                    dispatch("GetYarnUnInStockCount");
                    break;
                case "RHL":
                    dispatch("GetChemicalUnInStockCount");
                    break;
                case "RLL":
                    dispatch("GetDyesUnInStockCount");
                    break;
                case "FL":
                    dispatch("GetAccUnInStockCount");
                    break;
                case "WJ":
                    dispatch("GetHardUnInStockCount");
                    break;  
                case "XZ":
                    dispatch("GetOfficenInStockCount");
                    break;
                case "ENG":
                    dispatch("GetEngInStockCount");
                    break;  
                case "EQU":
                    dispatch("GetEquInStockCount");
                    break; 
                default:;break;    
            }
        },
        
        // 获取所有数据
        GetAllWhseUnInStockCount({dispatch}){
            dispatch("GetYarnUnInStockCount");
            dispatch("GetChemicalUnInStockCount");
            dispatch("GetDyesUnInStockCount");
            dispatch("GetAccUnInStockCount");
            dispatch("GetHardUnInStockCount");
            dispatch("GetOfficenInStockCount");
            dispatch("GetEngInStockCount");
            dispatch("GetEquInStockCount");
        }

    },

}

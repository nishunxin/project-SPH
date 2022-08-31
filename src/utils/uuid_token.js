import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久储存
export const getUUID = ()=>{
    //先从本地存储获取uuid 
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token) {
        //则生成游客临时身份
        uuid_token = uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    //必须要又返回数据
    return uuid_token;
}
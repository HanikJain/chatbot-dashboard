import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";


const optionfn = {
    optionExists: false, 
    url: '',
    href:true,
    api:false,
    id:'',
    sr_no:'',
    text:'',
    count: 0,
    parentId:'',
    addDisabled: false,
    checkboxDisabled: false,
    checked: false,
}

function useGetOptionData() {
    const data = useSelector((state) => state.addData.optionData);
    return data;
}

export default function useInsert() {
    
    const insert = (id, data) => {
        const arrID = id.split('.');
        
         
        if(arrID.length === 1) {
            if(data.count <= 10){
                data.count += 1;
                let a = data.count;
                data[a] = structuredClone(optionfn);
                let id = data.parentId + '.' + a;
                data[a].id = id
                data[a].parentId =  id;
                let sr_no = id.split('.').slice(1).join('.')
                data[a].sr_no = sr_no;
                data.optionExists = true;
             
                
            }
        }
        else {
            let b = arrID.shift();
            let newData = data[arrID[0]];
            let newID = arrID.join('.');
            insert(newID, newData);

        }
        

        return data;
   

       
    }


  return [insert];
}



export function useFind(){
    const data = useSelector((state) => state.addData.optionData);

    function getData(data){
        return () => {
            return data;
        }
    }

    const optionData = getData(data);
       
    const find = (id, data = undefined) => {
        if(data === undefined){
            data = optionData();
        }

        const arrID = id.split('.');
        
         
        if(arrID.length === 1) {
            const cloneData = structuredClone(data);
            return cloneData;       
        }
        else {
            arrID.shift();
            let newData = data[arrID[0]];
            let newID = arrID.join('.');
            return find(newID, newData);
        }
   
    }

    return [find];
}

export function useUpdate(){
    const data = useSelector((state) => state.addData.optionData);
    const clonedData = structuredClone(data);
    const dispatch = useDispatch();


    const update = (id, payload) => {
        function updateData(id, payload, data ) {
            const arrID = id.split('.');
        
         
            if(arrID.length === 1) {
                return structuredClone(payload); 
               
            }
            else {
                arrID.shift();
                const newData = structuredClone(data[arrID[0]]);
                const newID = arrID.join('.');
                data[arrID[0]] = structuredClone(updateData(newID, payload, newData));
                return structuredClone(data);
            }


        }

        const updatedData = updateData(id, payload, clonedData)
        dispatch(addDataActions.setAddOption(updatedData))

    }

   


    return [update];
}

import React from 'react'
import { useDispatch} from "react-redux";
import { modalDataActions } from "../store/modalData";

export default function useValidate() {
    const dispatch = useDispatch();

    function validate(data) {
        switch (data.type) {
            case "TEXT":
              return validateText(data);
    
            case "CARD":
                return validateCard(data);
    
            case "OPTION":
                return validateOption(data);
   
      
            default:
              break;
        }

    }



    function validateText(data){

        if(data.type.trim() === ""){
            const message = "Invalid Type"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } else if(data.keyword.trim() === "") {
            const message = "Invalid keyword"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } else if(data.textData.text.trim() === "") {
            const message = "Invalid Text"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } else {
            const requestConfigBody = {
                type: data.type,
                keyword: data.keyword.trim(),
                text: data.textData.text,
            };

            return requestConfigBody;
        }

    }

    function validateCard(data) {

        if(data.type.trim() === ''){
            const message = "Invalid Type"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;

        } else if(data.keyword.trim() === ''){
            const message = "Invalid keyword"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;

        } else if(data.cardData.name.trim() === '') {
            const message = "Invalid name"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;

        } else if(data.cardData.description.trim() === '') {
            const message = "Invalid description"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
            
        } else if(data.cardData.price === '') {
            const message = "Invalid price"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } else if(data.cardData.rating === '') {
            const message = "Invalid rating"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
            
        }else if(data.cardData.totalRatings === '') {
            const message = "Invalid Total Ratings"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
            
        }else  {
            const requestConfigBody = {
                type: data.type,
                keyword: data.keyword.trim(),
                name: data.cardData.name,
                description: data.cardData.description,
                price: data.cardData.price,
                rating: data.cardData.rating,
                totalRatings: data.cardData.totalRatings,
            };

            return requestConfigBody;
        
        }
    }

    function validateOption(data){
        
        if(data.type.trim() === ""){
            const message = "Invalid Type"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } else if(data.keyword.trim() === "") {
            const message = "Invalid keyword"
            dispatch(modalDataActions.setShowModal(message));
            return undefined;
        } 

        const res = validOptionChecker(data.optionData);
        if(res === undefined){
            return undefined;
        } else {
            return {
                optionData: structuredClone(data.optionData),
                type: data.type,
                keyword: data.keyword,
            };
        }
        
    }

    function validOptionChecker(data) {
        if(data.parentId !== '0') {
            if(data.text.trim() === ""){
                const message = `Invalid text at ${data.sr_no}`
                dispatch(modalDataActions.setShowModal(message));
                return undefined;
            }
            if(!data.optionExists ) {
                if(!data.checked ) {
                    const message = `Add link unchecked ${data.sr_no}`
                    dispatch(modalDataActions.setShowModal(message));
                    return undefined;
                } else if(data.api === data.href) {
                    const message = ` Error at ${data.sr_no}`
                    dispatch(modalDataActions.setShowModal(message));
                    return undefined;
                }else if(data.url.trim() === ""){
                    const message = `Invalid url at ${data.sr_no}`
                    dispatch(modalDataActions.setShowModal(message));
                    return undefined;
                }  else {
                    return true;
                }
                
            } else {
                if(data.url.trim() !== ""){
                    const message = `Invalid url at ${data.sr_no}`
                    dispatch(modalDataActions.setShowModal(message));
                    return undefined;
                } else if(data.checked) {
                    const message = `Add link unchecked ${data.sr_no}`
                    dispatch(modalDataActions.setShowModal(message));
                    return undefined;
                }  else {
                    for (let i = 1; i <= data.count; i++) {
                        const res = validOptionChecker(data[i]);
                        if(res === undefined) {
                            return undefined;
                        }
                    }

                    return true;
                }
            }
        } else {
            // validate title
            if (data.title.trim() === "") {
                const message = "Invalid Title"
                dispatch(modalDataActions.setShowModal(message));
                return undefined;
            }

            if(data.optionExists) {
                for (let i = 1; i <= data.count; i++) {
                    const res = validOptionChecker(data[i]);
                    if(res === undefined) {
                        return undefined;
                    }
                }
                return true;

            } else {
                const message = "Add options"
                dispatch(modalDataActions.setShowModal(message));
                return undefined;
            }
        }
        
    }

    return [validate];
}

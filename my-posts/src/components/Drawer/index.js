import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FaRegWindowClose } from 'react-icons/fa';
import * as yup from "yup";
import { noSroll } from "../../utility/tools";

function Drawer(props) {
    const {
        showBg = false,
        handleDrawer,
        handleFormSubmit,
        type = '',
        postTitle = '',
        postDesc = ''
    } = props;
    const schema = yup.object({
        postTitle: yup.string().required(),
        postText: yup.string().test('text', 'Must be at least 1 characters', val => val.length > 0),
      }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});
    const newPost = 'New post',
          editPost = 'Edit post';
    const onSubmit = (formData) => {
        handleFormSubmit(formData);
    }

    return (
        <React.Fragment>
            <div className={`drawer-bg ${showBg ? 'show' : ''}`} onClick={() => {handleDrawer(); noSroll(false);}}>
            </div>
            <div className="drawer-wrapper">
                <div className="form-container">
                    <div className="form-header">
                        <div className="close-drawer">
                            <button
                                style={{background: 'none', border: 'none'}}
                                onClick={() => {
                                    handleDrawer();
                                    noSroll(false);
                                }}
                            >
                                <FaRegWindowClose className="icon"/>
                            </button>
                        </div>
                        <div className="title-wrapper">
                            <h3 className="form-title">{type === 'newPost' ? newPost : editPost}</h3>
                        </div>
                    </div>
                    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field-wrapper">
                            <label className="form-text">Title</label>
                            <input 
                                {...register("postTitle")} 
                                aria-invalid={errors.postTitle ? "true" : "false"}
                                defaultValue={postTitle ? postTitle : ''}
                                className="form-title-input"
                                placeholder="Title here"
                            />
                            {errors.postTitle && <p className="error-message" role="alert">{errors.postTitle.message}</p>}
                        </div>
                        <div className="field-wrapper">
                            <label className="form-text">Description</label>
                            <textarea  
                                {...register("postText")} 
                                aria-invalid={errors.postText ? "true" : "false"}
                                defaultValue={postDesc ? postDesc : ''}
                                className="form-text-input" 
                                placeholder="Text here"
                            />
                            {errors.postText && <p className="error-message" role="alert">{errors.postText.message}</p>}
                        </div>
                        <div className="form-footer">
                            <input type="submit" className="form-submit-cta"/> 
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Drawer;
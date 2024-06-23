// src/pages/CreatePost.js
import { useEffect, useState } from 'react';
import { TextField, Button, Alert, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreatePostApi, UpdatePostApi } from './post.api'; // Import your createPost API function
import { styled } from '@mui/system';
import { PageHeader } from '../../Components/PageHeader';

const ImagePreview = styled('img')({
    width: '100%',
    height: 'auto',
    marginBottom: '10px'
});

const CreatePost = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [serverError, setServerError] = useState(null); // State for handling server-side errors
    const [imagePreview, setImagePreview] = useState(null); // State for previewing the image

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const { mutate: createPost } = CreatePostApi('/v1/post/create');
    const { mutate: updatePostReq } = UpdatePostApi('/v1/post/update');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64File = await fileToBase64(e.target.files[0]);

            setImagePreview(base64File); // Display preview
        }
    };
    const submitPost = async (data) => {
        const base64File = await fileToBase64(data.postImage[0]);

        const reqBody = {
            name: data.postName,
            description: data.postDescription,
            postImage: base64File
        };
        createPost(reqBody, {
            onSuccess: (res) => {
                if (res.responseCode === 200) {
                    setServerError('Post created successfully'); // Display success message
                    navigate('/post'); // Navigate to the post list or home
                } else {
                    setServerError(res.responseDataParams.data.message);
                }
            },
            onError: () => {
                setServerError('An error occurred during post creation. Please try again.'); // Set generic error message
            }
        });
    };
    const updatePost = async (data) => {
        const base64File = await fileToBase64(data.postImage[0]);

        const reqBody = {
            id: state.row._id,
            updateObject: {
                name: data.postName,
                description: data.postDescription,
                postImage: base64File
            }
        };
        updatePostReq(reqBody, {
            onSuccess: (res) => {
                if (res.responseCode === 200) {
                    setServerError('Post created successfully'); // Display success message
                    navigate('/post'); // Navigate to the post list or home
                } else {
                    setServerError(res.responseDataParams.data.message);
                }
            },
            onError: () => {
                setServerError('An error occurred during post creation. Please try again.'); // Set generic error message
            }
        });
    };
    useEffect(() => {
        if (state.row && (state.mode === 'edit' || state.mode === 'view')) {
            setValue('postName', state.row.name);
            setValue('postDescription', state.row.description);
            setValue('postImage', state.row.postImage);
            setImagePreview(state.row.postImage);
        }
    }, [setValue, state.mode, state.row]);

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Get base64 part
            reader.onerror = (error) => reject(error);
        });
    };
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {' '}
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <Box
                sx={{
                    width: { lg: '100%', md: '1000%' },
                    padding: '1.25rem 0.25rem 1.25rem 0rem'
                }}
                justifyItems={'center'}
                flexDirection={'column'}
            >
                <PageHeader navigateTo={-1} title={`${state.mode} post`} />

                <form>
                    <TextField
                        fullWidth
                        label="Post Name"
                        margin="normal"
                        {...register('postName', { required: 'Post Name is required' })}
                        error={!!errors.postName}
                        helperText={errors.postName?.message}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            readOnly: state?.mode === 'view' ? true : false
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Post Description"
                        margin="normal"
                        multiline
                        rows={4}
                        {...register('postDescription', {
                            required: 'Post Description is required'
                        })}
                        error={!!errors.postDescription}
                        helperText={errors.postDescription?.message}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            readOnly: state?.mode === 'view' ? true : false
                        }}
                    />
                    {state?.mode !== 'view' && (
                        <input
                            type="file"
                            accept="image/*"
                            {...register('postImage', { required: 'Post Image is required' })}
                            onChange={handleFileChange}
                            style={{ display: 'block', marginTop: '10px', marginBottom: '10px' }}
                            readOnly={state?.mode === 'view' ? true : false}
                        />
                    )}
                    {imagePreview && <ImagePreview src={imagePreview} alt="Post Image Preview" />}
                    {state?.mode === 'edit' ? (
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                            onClick={handleSubmit(updatePost)}
                        >
                            update Post
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                            onClick={handleSubmit(submitPost)}
                        >
                            Submit Post
                        </Button>
                    )}
                </form>
            </Box>
        </div>
    );
};

export default CreatePost;

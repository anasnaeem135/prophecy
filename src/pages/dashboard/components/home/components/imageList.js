import React, { useEffect, useState } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Loader from 'components/loader';
import { getAdvertisments } from '../helpers/api';
import { convertAdvertisments } from '../helpers/convertResults';

export default function StandardImageList() {
    const [imageData, setImageData] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        getAdvertismentHandler();
    }, []);

    async function getAdvertismentHandler() {
        const response = await getAdvertisments();

        if (response?.status === 200) {
            const { data } = response;
            setImageData(convertAdvertisments(data));
        }
        setReady(true);
    }

    return (
        <>
            {ready ? (
                <ImageList
                    sx={{
                        // width: '40%',
                        // overflow: '-moz-hidden-scrollable',
                        height: 350,
                        // overflowY: 'hidden',
                        overflow: 'auto',
                        // scrollbarWidth: 'thin',
                        scrollbarColor: 'transparent transparent',
                        maxHeight: '100vh',
                        // marginTop: 10,
                        // marginInlineEnd: 5,
                        // scrollbarColor: '#dc166c',
                    }}
                    cols={3}
                    rowHeight={164}>
                    {imageData.map(item => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                style={{ borderRadius: 10 }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <Loader />
            )}
        </>
    );
}

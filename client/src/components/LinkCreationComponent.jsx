import { ClipboardCopy } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { isValidLink } from '../utility/LinkValidator';

const LinkCreationComponent = () => {
    const [link, setLink] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [showClipboard, setShowClipboard] = useState(false);

    const shortenLink = async (link) => {
        setShowLoading(true);

        await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/shorten', { link })
            .then((response) => {
                if (response.data.shortLink) {
                    setShortLink(response.data.shortLink);
                    setShowLoading(false);
                    setShowClipboard(true);
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getShortLink = async () => {
        await axios.get(import.meta.env.VITE_BACKEND_URL + '/s/' + shortLink)
            .then((response) => {
                if (response.data.redirectUrl) {
                    window.open(response.data.redirectUrl, '_blank');
                } else {
                    alert(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='justify-center' id='main-content'>
            <div className="mt-[120px] text-center">
                <h1 className='font-league text-7xl font-bold'>shorten your url</h1>
                <h1 className='font-league text-6xl mt-3 font-bold text-purple-700'>for free.</h1>
                <p className='text-xl mt-3 font-roboto'>
                    Get a sharable short link, for free. <br />
                    Access all features and deep insights by signing up 😁
                </p>
                <div className="input mt-7">
                    <input 
                        type='text' 
                        placeholder='Enter your url...' 
                        className='font-normal font-roboto rounded-full px-5 py-3 w-1/3 border border-black hover:shadow-lg' 
                        value={link} 
                        onChange={(e) => setLink(e.target.value)} 
                    />
                    <br />
                    <div className='flex justify-center mt-10 items-center gap-8'>
                        <button
                            className='px-8 py-4 font-semibold bg-white rounded-[10px] bg-gradient-to-r from-[#5088d1] to-[#ca0eff] text-white border text-lg border-black'
                            onClick={() => {
                                if (link.length === 0) {
                                    alert('Please enter a link first. 😅');
                                    return;
                                } else if (isValidLink(link)) {
                                    shortenLink(link);
                                } else {
                                    alert('Please enter a valid link. 😅');
                                    setLink('');
                                }
                            }}
                        >
                            Generate for free
                        </button>
                        <p className='text-xl'>or</p>
                        <button
                            className='px-10 font-semibold py-4 bg-white rounded-[10px] border-white border text-black flex items-center gap-1 text-lg hover:border-black'
                            onClick={() => {
                                alert('This feature is not available yet. 😅');
                            }}
                        >
                            Sign up with <img src='client/src/assets/google_icon.png' width={30} className='ml-1' />
                        </button>
                    </div>
                </div>
                <br />
                <img src='client/src/assets/loading.gif' width={60} className={(showLoading ? '' : 'hidden') + ' mx-auto mt-7'} />
                <div 
                    className={(showClipboard ? '' : 'hidden ') + 'w-2/5 h-max py-3 text-left bg-green-300 mx-auto mt-5 mb-10 flex justify-between px-4 rounded-lg border border-black border-dashed cursor-pointer'}
                    onClick={() => {
                        getShortLink();
                    }}
                >
                    <p className='line-clamp-1'>{import.meta.env.VITE_FRONTEND_URL + shortLink}</p>
                    <ClipboardCopy />
                </div>
            </div>
        </div>
    );
};

export default LinkCreationComponent;
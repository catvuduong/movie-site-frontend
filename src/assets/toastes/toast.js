import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SuccessToast() {
    const notify = () => toast.success("Lorem ipsum dolor", {
        theme: "colored"
    })

    notify();

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    );
}

export { SuccessToast }; 
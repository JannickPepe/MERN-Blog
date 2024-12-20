import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById('portal-root') // Ensure this element exists in your HTML
    );
};

export default Portal;

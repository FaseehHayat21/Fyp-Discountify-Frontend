// import React, { useState } from 'react';

// const SideBar = () => {
//     const [selected, setSelected] = useState('Profile');

//     const icons = [
//         { title: 'Home' },
//         { title: 'Learning Path' },
//         { title: 'Give Test' },
//         { title: 'Profile' },
//     ];

//     const footerIcons = [
//         { title: 'Settings' },
//         { title: 'Logout' },
//     ];

//     const handleFunction = (title) => {
//         setSelected(title);
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             <div style={{ width: '200px', backgroundColor: '#21497F', color: 'white', height: '100%' }}>
//                 <div style={{ padding: '1em' }}>
//                     {icons.map((icon) => (
//                         <div
//                             key={icon.title}
//                             onClick={() => handleFunction(icon.title)}
//                             style={{
//                                 padding: '10px 0',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 transition: 'transform 0.2s',
//                                 ...(selected === icon.title ? { fontWeight: 'bold' } : {}),
//                             }}
//                         >
//                             <span style={{ marginRight: '10px' }}>{icon.title}</span>
//                         </div>
//                     ))}
//                 </div>

//                 <hr style={{ width: '80%', border: '1px solid white', margin: 'auto' }} />

//                 <div style={{ padding: '1em' }}>
//                     {footerIcons.map((icon) => (
//                         <div
//                             key={icon.title}
//                             onClick={() => handleFunction(icon.title)}
//                             style={{
//                                 padding: '10px 0',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 transition: 'transform 0.2s',
//                             }}
//                         >
//                             <span style={{ marginRight: '10px' }}>{icon.title}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

     
//         </div>
//     );
// };

// export default SideBar;
import React, { useState } from 'react';
import './SideBar.css';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(isOpen);
    };

    return (
        <div className={`sidebar`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                ☰
            </button>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    );
};

export default SideBar;

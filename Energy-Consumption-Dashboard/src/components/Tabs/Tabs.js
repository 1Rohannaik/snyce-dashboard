// import React, { useState } from 'react';
// import './Tabs.css';

// export default function Tabs({ tabs }) {
//   const [active, setActive] = useState(0);
//   return (
//     <div className="tabs">
//       {tabs.map((t, i) => (
//         <button key={t} className={`tab ${i===active ? 'active' : ''}`} onClick={() => setActive(i)}>
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }


// Tabs.js
import React from 'react';
import './Tabs.css';

export default function Tabs({ tabs, active, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map((t, i) => (
        <button key={t}
          className={`tab ${i===active ? 'active' : ''}`}
          onClick={() => onTabChange(i)}
        >{t}</button>
      ))}
    </div>
  );
}

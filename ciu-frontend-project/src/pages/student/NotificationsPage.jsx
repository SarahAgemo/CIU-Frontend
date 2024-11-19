// import React from "react";
// import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";

// const notifications = [
//   {
//     id: 1,
//     title: "Examinations Update",
//     message: "Please note the updated guidelines for upcoming examinations.",
//     timestamp: "24 Sept 2024 at 2:15 p.m",
//     color: "green",
//   },
//   {
//     id: 2,
//     title: "Results uploaded",
//     message: "Results for the last semester are now available online.",
//     timestamp: "24 Sept 2024 at 2:15 p.m",
//     color: "green",
//   },
//   {
//     id: 3,
//     title: "Change of Timetable",
//     message: "The class timetable has been updated. Please check the portal.",
//     timestamp: "24 Sept 2024 at 2:15 p.m",
//     color: "green",
//   },
// ];

// const Notifications = ({ onClose }) => {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "60px",
//         right: "20px",
//         backgroundColor: "#fff",
//         border: "1px solid #ccc",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         borderRadius: "8px",
//         width: "350px",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "10px",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#f7f7f7",
//         }}
//       >
//         <h3 style={{ margin: 0 }}>Notifications</h3>
//         <button
//           style={{
//             background: "none",
//             border: "none",
//             fontSize: "18px",
//             cursor: "pointer",
//           }}
//           onClick={onClose}
//         >
//           ×
//         </button>
//       </div>
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           style={{
//             borderBottom: "1px solid #ddd",
//             padding: "10px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <span
//               style={{
//                 backgroundColor: notification.color,
//                 color: "#fff",
//                 padding: "2px 6px",
//                 borderRadius: "4px",
//                 fontSize: "12px",
//                 marginRight: "10px",
//               }}
//             >
//               {notification.title}
//             </span>
//             <p style={{ margin: "5px 0 0" }}>{notification.message}</p>
//             <small style={{ color: "#999" }}>{notification.timestamp}</small>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <FaCheckCircle
//               style={{ cursor: "pointer", color: "green" }}
//               onClick={() => console.log(`Marked notification ${notification.id} as read`)}
//             />
//             <FaTrashAlt
//               style={{ cursor: "pointer", color: "red" }}
//               onClick={() => console.log(`Deleted notification ${notification.id}`)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notifications;






// // import React from 'react';
// // import { FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

// // const notifications = [
// //   {
// //     id: 1,
// //     title: "Examinations Update",
// //     message: "Please note the updated guidelines for upcoming examinations.",
// //     timestamp: "24 Sept 2024 at 2:15 p.m",
// //     color: "green",
// //   },
// //   {
// //     id: 2,
// //     title: "Results uploaded",
// //     message: "Results for the last semester are now available online.",
// //     timestamp: "24 Sept 2024 at 2:15 p.m",
// //     color: "green",
// //   },
// //   {
// //     id: 3,
// //     title: "Change of Timetable",
// //     message: "The class timetable has been updated. Please check the portal.",
// //     timestamp: "24 Sept 2024 at 2:15 p.m",
// //     color: "green",
// //   },
// // ];

// // const Notifications = () => {
// //   const handleDelete = (id) => {
// //     console.log(`Deleted notification with id: ${id}`);
// //     // Add functionality to delete the notification
// //   };

// //   const handleMarkAsRead = (id) => {
// //     console.log(`Marked notification with id: ${id} as read`);
// //     // Add functionality to mark notification as read
// //   };

// //   return (
// //     <div style={{ border: '2px solid green', padding: '20px', width: '500px', margin: '20px auto', borderRadius: '8px' }}>
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //         <h2>NOTIFICATIONS</h2>
// //         <button style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
// //       </div>
// //       {notifications.map((notification) => (
// //         <div
// //           key={notification.id}
// //           style={{
// //             borderBottom: '1px solid #ddd',
// //             padding: '10px 0',
// //             display: 'flex',
// //             justifyContent: 'space-between',
// //           }}
// //         >
// //           <div>
// //             <span
// //               style={{
// //                 backgroundColor: notification.color,
// //                 color: '#fff',
// //                 padding: '2px 6px',
// //                 borderRadius: '4px',
// //                 fontSize: '12px',
// //                 marginRight: '10px',
// //               }}
// //             >
// //               {notification.title}
// //             </span>
// //             <p style={{ margin: '5px 0 0' }}>{notification.message}</p>
// //             <small style={{ color: '#999' }}>{notification.timestamp}</small>
// //           </div>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //             <FaCheckCircle
// //               style={{ cursor: 'pointer', color: 'green' }}
// //               onClick={() => handleMarkAsRead(notification.id)}
// //             />
// //             <FaTrashAlt
// //               style={{ cursor: 'pointer', color: 'red' }}
// //               onClick={() => handleDelete(notification.id)}
// //             />
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Notifications;

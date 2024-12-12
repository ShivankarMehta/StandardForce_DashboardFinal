import "./loader.modules.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

// export default function Home() {
//     return (
//         <div className='main flex justify-center items-center h-screen bg-gray-100'>
//             <div className="loader w-50 h-50 border-15 border-blue-500 border-dashed rounded-full animate-spin"></div>
//             <div>Loading....</div>
//         </div>
//     );
// }

export default function Home() {
  return (
    <div className="main flex justify-center items-center h-screen rounded-lg m-6 gap-10">
      <div className="spinner animate-spin"></div>
    </div>
  );
}

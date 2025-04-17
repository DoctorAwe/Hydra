import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Recognition from "../pages/Recognition";
import ExportResult from "../pages/ExportResult";
import ProjectIntro from "../pages/Introduce";
import AlPI from "../pages/AlIntroduce"
// import FrameRecognition from '../pages/FrameRecognition';
// import ExportResults from '../pages/ExportResults';
// import ProjectIntro from '../pages/ProjectIntro';
// import ContactUs from '../pages/ContactUs';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/frame-recognition', element: <Recognition /> },
            { path: '/export-results', element: <ExportResult /> },
            { path: '/project-intro', element: <ProjectIntro /> },
            { path: '/al-intro', element: <AlPI /> },
            // { path: '/contact-us', element: <ContactUs /> },
        ],
    },
]);

export default router;

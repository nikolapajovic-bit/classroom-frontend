import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import { BookOpen, Building2, ClipboardCheck, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import Dashboard from "./pages/dashboard";
import SubjectsList from "./pages/subjects/list";
import SubjectsCreate from "./pages/subjects/create";
import SubjectsShow from "./pages/subjects/show";
import ClassesList from './pages/classes/list';
import ClassesCreate from './pages/classes/create';
import ClassesShow from './pages/classes/show';
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import DepartmentsList from "./pages/departments/list";
import DepartmentsCreate from "./pages/departments/create";
import DepartmentShow from "./pages/departments/show";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "pIBwnJ-ICdOwN-wHvbQD",
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'Home',
                    icon: <Home />
                  }
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  show: '/subjects/show/:id',
                  meta: { label: 'Subjects', icon: <BookOpen /> }
                },
                {
                  name: 'departments',
                  list: '/departments',
                  show: '/departments/show/:id',
                  create: '/departments/create',
                  meta: {
                    label: 'Departments',
                    icon: <Building2 />
                  }
                },
                {
                  name: 'classes',
                  list: '/classes',
                  create: '/classes/create',
                  show: '/classes/show/:id',
                  meta: { label: 'Classes', icon: <GraduationCap /> }
                },
                {
                  name: 'users',
                  list: '/faculty',
                  show: '/faculty/show/:id',
                  meta: {
                    label: 'Faculty', icon: <Users />
                  }
                },
                {
                  name: 'enrollments',
                  list: '/enrollments',
                  create: '/enrollments/create',
                  meta: {
                    label: 'Enrollments',
                    icon: <ClipboardCheck />
                  },
                }
              ]}
            >
              <Routes>
                <Route element={
                  <Authenticated key='public-routes' fallback={<Outlet />}>
                    <NavigateToResource fallbackTo="/" />
                  </Authenticated>
                }>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Route>

                <Route element={
                  <Authenticated key='private-routes' fallback={<Login />}>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }>
                  <Route path='/' element={<Dashboard />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                    <Route path="show/:id" element={<SubjectsShow />} />
                  </Route>

                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route path="create" element={<DepartmentsCreate />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
                </Route>
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

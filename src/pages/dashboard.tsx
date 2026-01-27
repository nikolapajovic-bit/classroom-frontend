// import { useMemo } from 'react';
// import { useLink, useList } from '@refinedev/core';
// import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import { BookOpen, Building2, GraduationCap, Layers, ShieldCheck, Users } from 'lucide-react';

// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import type { Department, Subject, User } from '@/types';

// type ClassListItem = {
//   id: number;
//   name: string;
//   createdAt?: string;
//   subject?: {
//     name: string;
//   };
//   teacher?: {
//     name: string;
//   }
// }

// const roleColors = ["#f97316", "#0ea5e9", "#22c55e", "#a855f7"];

// const Dashboard = () => {
//   const Link = useLink();

//   const { query: usersQuery } = useLink<User>({
//     resource: 'users',
//     pagination: { mode: 'off' },
//   });
//   const { query: subjectsQuery } = useLink<Subject>({
//     resource: 'subjects',
//     pagination: { mode: 'off' },
//   });
//   const { query: departmentQuery } = useLink<Department>({
//     resource: 'departments',
//     pagination: { mode: 'off' },
//   });
//   const { query: classesQuery } = useLink<ClassListItem>({
//     resource: 'classes',
//     pagination: { mode: 'off' },
//   });

//   const users = usersQuery.data?.data ?? [];
//   const subjects = subjectsQuery.data?.data ?? [];
//   const departments = departmentQuery.data?.data ?? [];
//   const classes = classesQuery.data?.data ?? [];

//   const usersByRole = useMemo(() => {
//     const counts = users.reduce<Record<string, number>>((acc, user) => {
//       const role = user.role ?? "unknown";
//       acc[role] = (acc[role] || 0) + 1;
//       return acc;
//     }, {});

//     return Object.entries(counts).map(([role, total]) => ({ role, total }));
//   }, [users]);

//   const subjectsByDepartment = useMemo(() => {
//     const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
//       const departmentName = (subject as { department?: { name?: string } }).department?.name ?? "Unassigned";
//       acc[departmentName] = (acc[departmentName] || 0) + 1;
//       return acc;
//     }, {});

//     return Object.entries(counts).map(([department, total]) => ({ department, total }));
//   }, [subjects]);

//   const classesBySubject = useMemo(() => {
//     const counts = classes.reduce<Record<string, number>>((acc, classItem) => {
//       const subjectName = classItem.subject?.name ?? "Unassigned";
//       acc[subjectName] = (acc[subjectName] || 0) + 1;
//       return acc;
//     }, {});

//     return Object.entries(counts).map(([subject, total]) => ({ subject, total }));
//   }, [classes]);

//   const newestClasses = useMemo(() => {
//     return [...classes].sort((a, b) => {
//       const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//       const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//       return bTime - aTime;
//     }).slice(0, 5);
//   }, [classes]);

//   const newestTeachers = useMemo(() => {
//     return users.filter((user) => user.role === 'teacher').sort((a, b) => {
//       const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//       const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//       return bTime - aTime;
//     }).slice(0, 5);
//   }, [users]);

//   const topDepartments = useMemo(() => {
//     return [...subjectsByDepartment].sort((a, b) => b.totalSubjects - a.totalSubjects).slice(0, 5).map((item, index) => ({
//       ...item, departmentId: index
//     }));
//   }, [subjectsByDepartment]);

//   const topSubjects = useMemo(() => {
//     return [...classesBySubject].sort((a, b) => b.totalClasses - a.totalClasses).slice(0, 5).map((item, index) => ({
//       ...item, subjectId: index,
//     }))
//   }, [classesBySubject])

//   const kpis = [
//     {
//       label: 'Total Users',
//       value: users.length,
//       icon: Users,
//       accent: 'text-blue-600'
//     },
//     {
//       label: 'Teachers',
//       value: users.filter((user) => user.role === 'teacher').length,
//       icon: GraduationCap,
//       accent: 'text-emerald-600'
//     },
//     {
//       label: 'Admins',
//       value: users.filter((user) => user.role === 'admin').length,
//       icon: ShieldCheck,
//       accent: 'text-amber-600'
//     },
//     {
//       label: 'Subjects',
//       value: subjects.length,
//       icon: BookOpen,
//       accent: 'text-purple-600'
//     },
//     {
//       label: 'Departments',
//       value: departments.length,
//       icon: Building2,
//       accent: 'text-cyan-600'
//     },
//     {
//       label: 'Classes',
//       value: classes.length,
//       icon: Layers,
//       accent: 'text-rose-600'
//     }
//   ]

//   return (
//     <div className='space-y-6'>
//       <div>
//         <h1 className='page-title'>Dashboard</h1>
//         <p className='text-muted-foreground'>
//           A quick snapshot of the latest activity and key metrics.
//         </p>
//       </div>

//       <Card className='hover:shadow-md transition-shadow'>
//         <CardHeader>
//           <CardTitle>Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
//             {kpis.map((kpi) => (
//               <div key={kpi.label} className='rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/40 hover:bg-muted/40 transition-colors'>
//                 <div className='flex items-center justify-between'>
//                   <p className='text-xs font-semibold text-muted-foreground'>
//                     {kpi.label}
//                   </p>
//                   <kpi.icon className={`h-4 w-4 ${kpi.accent}`} />
//                 </div>
//                 <div className='mt-2 text-2xl font-semibold'>{kpi.value}</div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
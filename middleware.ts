import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
  
  const isProtectedRoute = createRouteMatcher([
    '/user',
    '/user/Catalogue',
    '/user/Community',
    '/user/PrincipalPage',
    '/user/Profile',
    '/user/Questionnaire',
    '/userUserSettings',
    '/meeting(.*)'
  ]);
  
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };
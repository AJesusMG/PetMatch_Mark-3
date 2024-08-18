// import { NextResponse, NextRequest } from "next/server";
// import  db from "@/libs/db";

// export async function PATCH(request : NextRequest, { params } : { params : { email : string } }) {
//     const email = params.email;
//     interface ReqBody { name : string, email : string, phoneNumber : string, instagramUrl : string, facebookURL : string }

//     const data = await request.json() as ReqBody;
//     try{

//     if(!email) {
//         return NextResponse.json({
//             message: "Email is required",
//         }, {
//             status: 400,
//         });
//     }

//         const user = await db.user.findFirst({
//             where: {
//                 email: String(email),
//             },
//         });

//         if(user){
//             const userUpdated = await db.user.update(
//                 {
//                     where: {
//                         email: String(email),
//                     },
//                     data: {
//                         name: data.name,
//                         phoneNumber: data.phoneNumber,
//                         instagramUrl: data.instagramUrl,
//                         facebookUrl: data.facebookURL, 
//                     },
//                 }
//             )
//         }

//     }catch(error) {
//         return NextResponse.json({
//             message: "User not found",
//         }, {
//             status: 404,
//         });
//     } 
// }

// export async function GET(request : NextRequest, { params } : { params : { email : string } }) {
//     const email = params.email;
//     try {
//         const user = await db.user.findFirst({
//             where: {
//                 email: String(email),
//             },
//         });

//         if(!user){
//             return NextResponse.json({
//                 message: "User not found",
//             }, {
//                 status: 404,
//             });
//         }

//         return NextResponse.json(user);
//     } catch (error) {
//         return NextResponse.json({
//             message: "User not found",
//         }, {
//             status: 404,
//         });
//     }
// }
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { connect } from "mongoose";
import {NextResponse} from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newTitle: title, newDescription: description} = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message: "Topic Updated"}, {status: 200});
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB;
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic deleted"}, {status: 200});
}
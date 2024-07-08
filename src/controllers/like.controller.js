import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if(!isValidObjectId){
        throw new ApiError(400, "Video id is invalid");
    }
    
    const like = await Like.findOne({ video: videoId, likedBy: req.user._id })

    if(like){
        like.deleteOne();
        return res.status(200).json(new ApiResponse(200, {}, "Like removed"))
    }

    const likedVideo = await Like.create({ video: videoId, likedBy: req.user._id });

    return res.status(201).json(new ApiResponse(200, likedVideo, "Liked"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if(!isValidObjectId){
        throw new ApiError(400, "Invalid comment id");
    }

    
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
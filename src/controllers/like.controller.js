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

    if(!like){
        const newLike = await Like.create({ video: videoId, likedBy: req.user._id});

        return res.status(201).json(new ApiResponse(201, newLike, "Video liked"))
    }

    const removeLike = await like.deleteOne();
    return res.status(200).json(new ApiResponse(200, removeLike, "Video unliked");

    // if(like){
    //     like.deleteOne();
    //     return res.status(200).json(new ApiResponse(200, {}, "Video like removed"))
    // }

    // const likedVideo = await Like.create({ video: videoId, likedBy: req.user._id });

    // return res.status(201).json(new ApiResponse(201, likedVideo, "Video liked"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if(!isValidObjectId){
        throw new ApiError(400, "Invalid comment id");
    }

    const like = Like.findOne({ comment: commentId, likedBy: req.user._id})
    console.log(like);

    if(like){
        like.deleteOne();
        return res.status(200).json(new ApiResponse(200, {}, "Comment like removed."))
    }

    const likedComment = Like.create({ comment: commentId, likedBy: req.user._id })
    return res.status(201).json(new ApiResponse(200, likedComment, "Comment liked"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!isValidObjectId){
        throw new ApiError(400, "Invalid tweet id");
    }
    const like = await Like.findOne({ tweet: tweetId, likedBy: req.user._id })

    if(like){
        like.deleteOne();
        return res.status(200).json(new ApiResponse(200, {}, "Tweet like removed."))
    }

    const likedTweet = await Like.create({ tweet: tweetId, likedBy: req.user._id });
    return res.status(201).json(new ApiResponse(201, likedTweet, "Tweet liked"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    if(!isValidObjectId){
        throw new ApiError(400, "Invalid video id")
    }
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
const userModel = require("../../models/user.model");
const cloudinary = require("../../config/cloudinary");
const { sendSuccessResponse, handleError } = require("../../utils/responseUtils");
const streamifier = require("streamifier");
const { comparePassword, hashPassword } = require("../../utils/passwordUtils");
const { sendDeleteAccountEmail } = require("../../services/emailService");
const { default: mongoose } = require("mongoose");

module.exports = {
  // Get user profile
  getUserProfile: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.userID).select("-password");
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "User profile fetched successfully", user);
    } catch (error) {
      return handleError(next, "Error fetching user profile", 500);
    }
  },

  // Find user profile by username
  getUserProfileByUsername: async (req, res, next) => {
    const { username } = req.params;
    try {
      const user = await userModel.findOne({ username }).select("-password");
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "User profile fetched successfully", user);
    } catch (error) {
      return handleError(next, "Error fetching user profile", 500);
    }
  },

  // Update user profile (name, bio, and optionally profile image)
  updateUserProfile: async (req, res, next) => {
    const { name, bio, phoneNumber, preferences } = req.body;
    let profileImage;

    try {
      // Check if file exists
      if (req.file) {
        // Ensure req.file.buffer is defined
        console.log(`req.file.buffer: ${req.file.buffer}`);
        if (!req.file.buffer) {
          return handleError(next, "File buffer is undefined", 400);
        }

        const user = await userModel.findById(req.userID);
        console.log(`user: ${user}`);
        if (!user) {
          return handleError(next, "User not found", 404);
        }

        // Upload image to Cloudinary using the buffer stream
        const uploadedImage = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `profile_images/${user.username}`,
              public_id: `${user.username}_${user._id}_profile`,
              overwrite: true,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream); // Use buffer stream
        });

        profileImage = uploadedImage.secure_url;
      }

      const updatedUser = await userModel.findByIdAndUpdate(req.userID, { name, bio, phoneNumber, profileImage: profileImage || undefined, preferences }, { new: true, runValidators: true }).select("-password");

      if (!updatedUser) {
        return handleError(next, "User not found", 404);
      }

      return sendSuccessResponse(res, "User profile updated successfully", updatedUser);
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
      return handleError(next, error.message || "Error updating user profile", 500);
    }
  },
  // Upload a new profile image
  uploadProfileImage: async (req, res, next) => {
    try {
      if (!req.file) {
        return handleError(next, "No file uploaded", 400);
      }

      // Ensure req.file.buffer is defined
      if (!req.file.buffer) {
        return handleError(next, "File buffer is undefined", 400);
      }

      const user = await userModel.findById(req.userID);
      console.log("user: ", user);
      if (!user) {
        return handleError(next, "User not found", 404);
      }

      // Upload the image to Cloudinary using a buffer stream
      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `profile_images/${user.username}`,
            public_id: `${user.username}_${user._id}_profile`,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream); // Pipe the buffer stream to Cloudinary
      });

      const updatedUser = await userModel.findByIdAndUpdate(req.userID, { profileImage: uploadedImage.secure_url }, { new: true }).select("-password");
      if (!updatedUser) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "Profile image updated successfully", updatedUser);
    } catch (error) {
      console.error("Error in uploadProfileImage:", error);
      return handleError(next, "Error uploading profile image", 500);
    }
  },
  // Change user password
  changePassword: async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await userModel.findById(req.userID);
      if (!user) {
        return handleError(next, "User not found", 404);
      }

      // Compare the old password using the comparePassword utility function
      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        return handleError(next, "Old password is incorrect", 400);
      }

      // Hash the new password and update
      user.password = await hashPassword(newPassword);
      await user.save();

      return sendSuccessResponse(res, "Password updated successfully", {});
    } catch (error) {
      return handleError(next, error.message || "Error changing password", 500);
    }
  },
  // Delete user profile
  deleteUserProfile: async (req, res, next) => {
    const { password } = req.body;
    try {
      // Find the user by ID
      const user = await userModel.findById(req.userID);
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      // Compare the provided password with the stored hashed password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return handleError(next, "Incorrect password", 400);
      }
      const parts = user.profileImage.split("/");
      if (parts.length > 1) {
        const lastPart = parts?.pop();
        if (lastPart) {
          const publicId = lastPart.split(".")[0];
          await cloudinary.uploader.destroy(`profile_images/${publicId}`);
        }
      }
      // send email to user
      await sendDeleteAccountEmail(user.email);
      // Delete the user account
      await userModel.findByIdAndDelete(req.userID);
      return sendSuccessResponse(res, "User account and associated image deleted successfully", {});
    } catch (error) {
      return handleError(next, error.message || "Error deleting user account", 500);
    }
  },
  // Follow User Profile
  // followUser: async (req, res, next) => {
  //   const { userId } = req.params;
  //   const currentUserId = req.userID;

  //   try {
  //     // 1. Find the user to follow
  //     const userToFollow = await userModel.findById(userId);
  //     if (!userToFollow) {
  //       return handleError(next, 'User not found', 404);
  //     }

  //     // 2. Find the current user
  //     const currentUser = await userModel.findById(currentUserId);
  //     if (!currentUser) {
  //       return handleError(next, 'Current user not found', 404); // This should ideally not happen if authMiddleware is working
  //     }

  //     // 3. Check if already following
  //     if (userToFollow.followers.includes(currentUserId)) {
  //       return handleError(next, 'Already following this user', 400);
  //     }

  //     // 4. Update the followers array of the user being followed
  //     userToFollow.followers.push(currentUserId);
  //     await userToFollow.save();

  //     // 5. Update the following array of the current user
  //     currentUser.following.push(userId);
  //     await currentUser.save();

  //     // 6. Create a notification for the followed user
  //     const newNotification = await notificationModel.create({
  //       user: userId, // User being followed
  //       message: `${currentUser.username} started following you.`,
  //       read: false,
  //     });

  //     // 7. send response notification to the followed user
  //     sendSuccessResponse(res, 'User followed successfully', {
  //       user: userToFollow,
  //       notification: newNotification,
  //     });

  //     return sendSuccessResponse(
  //       res,
  //       'User followed successfully',
  //       userToFollow
  //     );
  //   } catch (error) {
  //     return handleError(next, 'Error following user', 500);
  //   }
  // },

  // Unfollow User
  // unfollowUser: async (req, res, next) => {
  //   const { userId } = req.params;
  //   const currentUserId = req.userID;

  //   try {
  //     // 1. Find the user to unfollow
  //     const userToUnfollow = await userModel.findById(userId);
  //     if (!userToUnfollow) {
  //       return handleError(next, 'User not found', 404);
  //     }

  //     // 2. Find the current user
  //     const currentUser = await userModel.findById(currentUserId);
  //     if (!currentUser) {
  //       return handleError(next, 'Current user not found', 404);
  //     }

  //     // 3. Check if already following
  //     if (!userToUnfollow.followers.includes(currentUserId)) {
  //       return handleError(next, 'Not following this user', 400);
  //     }

  //     // 4. Update the followers array of the user being unfollowed
  //     userToUnfollow.followers = userToUnfollow.followers.filter(
  //       (id) => id.toString() !== currentUserId
  //     );
  //     await userToUnfollow.save();

  //     // 5. Update the following array of the current user
  //     currentUser.following = currentUser.following.filter(
  //       (id) => id.toString() !== userId
  //     );
  //     await currentUser.save();

  //     return sendSuccessResponse(
  //       res,
  //       'User unfollowed successfully',
  //       userToUnfollow
  //     );
  //   } catch (error) {
  //     return handleError(next, 'Error unfollowing user', 500);
  //   }
  // },

  followUser: async (req, res, next) => {
    const { userId } = req.params;
    const currentUserId = req.userID;

    // Input validation
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return handleError(next, "Invalid user ID", 400);
    }

    try {
      const userToFollow = await userModel.findById(userId);
      if (!userToFollow) {
        return handleError(next, "User not found", 404);
      }

      const currentUser = await userModel.findById(currentUserId);
      if (!currentUser) {
        return handleError(next, "Current user not found", 404);
      }

      // Check if already following BEFORE adding to array
      if (currentUser.following.includes(userId)) {
        return handleError(next, "Already following this user", 400);
      }

      currentUser.following.push(userId);
      userToFollow.followers.push(currentUserId);

      await Promise.all([currentUser.save(), userToFollow.save()]);

      return sendSuccessResponse(res, "User followed successfully", {
        currentUser: currentUser,
        notification: newNotification,
      });
    } catch (error) {
      console.error("Error following user:", error);
      return handleError(next, "Error following user", 500);
    }
  },

  unfollowUser: async (req, res, next) => {
    const { userId } = req.params;
    const currentUserId = req.userID;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return handleError(next, "Invalid user ID", 400);
    }

    try {
      const userToUnfollow = await userModel.findById(userId);
      if (!userToUnfollow) {
        return handleError(next, "User not found", 404);
      }

      const currentUser = await userModel.findById(currentUserId);
      if (!currentUser) {
        return handleError(next, "Current user not found", 404);
      }

      if (!userToUnfollow.followers.includes(currentUserId)) {
        return handleError(next, "Not following this user", 400);
      }

      userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== currentUserId);
      currentUser.following = currentUser.following.filter((id) => id.toString() !== userId);

      await Promise.all([userToUnfollow.save(), currentUser.save()]); // Save both users atomically

      return sendSuccessResponse(
        res,
        "User unfollowed successfully",
        {} // Return only a success message
      );
    } catch (error) {
      console.error("Error unfollowing user:", error); // Log the error for debugging
      return handleError(next, "Error unfollowing user", 500);
    }
  },

  // Get Followers
  getFollowers: async (req, res, next) => {
    const { userId } = req.params;
    console.log("userId: ", userId);

    try {
      const user = await userModel.findById(userId).populate("followers", "username name profileImage following followers bio"); // Populate followers with selected fields
      console.log("user: ", user);

      if (!user) {
        console.log("user not found");
        return handleError(next, "User not found", 404);
      }

      return sendSuccessResponse(res, "Followers fetched successfully", user.followers);
    } catch (error) {
      return handleError(next, "Error fetching followers", 500);
    }
  },

  // Get Following
  getFollowings: async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await userModel.findById(userId).populate("following", "username name profileImage following followers bio");

      if (!user) {
        return handleError(next, "User not found", 404);
      }

      return sendSuccessResponse(res, "Following fetched successfully", user.following);
    } catch (error) {
      return handleError(next, "Error fetching following", 500);
    }
  },

  // deleteUserProfile: async (req, res, next) => {
  //   const { password } = req.body;

  //   try {
  //     // Find the user by ID
  //     const user = await userModel.findById(req.userID);
  //     if (!user) {
  //       return handleError(next, "User not found", 404);
  //     }

  //     // Compare the provided password with the stored hashed password
  //     const isMatch = await comparePassword(password, user.password);
  //     if (!isMatch) {
  //       return handleError(next, "Incorrect password", 400);
  //     }

  //     // Delete associated profile image from Cloudinary
  //     if (user.profileImage && user.profileImage !== "default-profile.png") {
  //       const publicId = user.profileImage.split("/").pop().split(".")[0]; // Extract publicId from the image URL
  //       await deleteMedia(publicId, "image"); // Delete the image from Cloudinary
  //     }

  //     // Send account deletion email to user
  //     await sendDeleteAccountEmail(user.email);

  //     // Delete the user account from the database
  //     await userModel.findByIdAndDelete(req.userID);

  //     return sendSuccessResponse(res, "User account and associated profile image deleted successfully", {});
  //   } catch (error) {
  //     return handleError(next, error.message || "Error deleting user account", 500);
  //   }
  // },
};

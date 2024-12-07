import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUserProfileStore } from '../../store/userProfileStore';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/date';
import BackToHome from '../base/BackToHome';
import FollowButton from '../userProfile/FollowButton';
import { useAuthStore } from '../../store/authStore';

const UserProfile = () => {
  const { username } = useParams();
  const {
    fetchUserProfileByUsername,
    user,
    isLoading,
    error,
    followers,
    following,
    isLoadingFollowers,
    isLoadingFollowing,
    fetchFollowers,
    fetchFollowing,
  } = useUserProfileStore();
  const { user: authUser } = useAuthStore();

  useEffect(() => {
    fetchUserProfileByUsername(username);
  }, [username, fetchUserProfileByUsername]);

  // Fetch followers and following only after user object is fetched successfully
  useEffect(() => {
    if (user) {
      fetchFollowers(user._id);
      fetchFollowing(user._id);
    }
  }, [user, fetchFollowers, fetchFollowing]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="text-gray-600 h-screen flex-center">
        <div>
          <p>User not found.</p>
          {error && (
            <p>
              <b>Error:</b> {error}
            </p>
          )}
          <i>
            {
              'If you think this is an error, please contact us. Alternatively, you can try searching for the user again.'
            }
          </i>
          <b>
            <BackToHome />
          </b>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

        {user.profileImage && (
          <img
            src={user.profileImage}
            alt={user.username}
            className="w-40 h-40 rounded object-cover"
          />
        )}

        {/* User Details */}
        <div className="flex items-center mb-4">
          <span className="text-gray-600">
            <strong>Name:</strong> {user.name}
          </span>
        </div>

        {user.role === 'admin' && (
          <div className="flex items-center mb-4">
            <span className="text-gray-600 border-2 p-2">
              You are an {user.role === 'admin' && 'Admin'}
            </span>
          </div>
        )}

        {user.username && (
          <div className="flex items-center mb-4">
            <span className="text-gray-600">
              <strong>Username:</strong> {user.username}
            </span>
          </div>
        )}

        <div className="flex items-center mb-4">
          <span className="text-gray-600">
            <strong>Email:</strong> {user.email}
          </span>
        </div>

        <p className="text-gray-700 mb-4">
          <strong>Joined At:</strong> {formatDate(user.joinedAt)}
        </p>

        {user.bio && (
          <p className="text-gray-700 mb-4">
            <strong>Bio:</strong> {user.bio}
          </p>
        )}

        {/* Followers and Following Lists */}
        <div>
          {isLoadingFollowers ? (
            <div>Loading followers...</div>
          ) : (
            <div className="mb-4">
              <h3>Followers ({followers.length})</h3>
              <ul>
                {followers.map(follower => (
                  <li key={follower._id}>
                    <Link
                      to={`/profile/username/${follower.username}`}
                      className="hover:underline"
                    >
                      <div className="flex items-center gap-4 border p-2 w-max">
                        <img
                          src={follower.profileImage}
                          alt={follower.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {follower.name || follower.username}
                        {/* 
                        {authUser && user._id !== authUser._id && (
                          <FollowButton userId={user._id} />
                        )} */}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isLoadingFollowing ? (
            <div>Loading following...</div>
          ) : (
            <div>
              <h3>Following ({following.length})</h3>
              <ul>
                {following.map(followedUser => (
                  <li key={followedUser._id}>
                    <Link
                      to={`/profile/username/${followedUser.username}`}
                      className="hover:underline"
                    >
                      <div className="flex items-center gap-4 border p-2 w-max">
                        <img
                          src={followedUser.profileImage}
                          alt={followedUser.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {followedUser.name || followedUser.username}

                        {/* {authUser && user._id !== authUser._id && (
                          <FollowButton userId={user._id} />
                        )} */}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Follow Button (Only if viewing another user's profile) */}
        {authUser && user._id !== authUser._id && (
          <FollowButton userId={user._id} />
        )}
      </div>
    </motion.div>
  );
};

export default UserProfile;

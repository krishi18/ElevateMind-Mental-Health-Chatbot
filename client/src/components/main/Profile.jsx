import React, { useEffect } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import { formatDate } from '../../utils/date';
import { siteName } from '../../config/envConfig';

const Profile = () => {
  const { fetchUserProfile, user, isLoading } = useUserProfileStore();

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (isLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-48 mb-4 md:mb-0">
          <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
        <div className="md:ml-6 w-full">
          <h2 className="text-2xl font-bold mb-4">
            <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
          </h2>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-6 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-700">Badges:</p>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-6 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-gray-500">User not found</div>;
  }

  const profileData = user;

  const {
    name,
    email,
    profileImage,
    username,
    bio,
    phoneNumber,
    joinedAt,
    lastLogin,
    badges,
  } = profileData;

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          Hello, {username ? username : name}!
        </h1>
        <p className="text-gray-600">
          Welcome to your {siteName}'s Dashboard page. You can update your
          profile information, view your badges, and more.
        </p>
        <p className="text-gray-600">
          You will get a reminder email to update your check-in daily at 9:00 AM{' '}
        </p>
      </div>

      <div className="bg-white shadow-lg mt-4 rounded-lg p-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <img
            src={profileImage}
            alt={`${name}'s profile`}
            className="aspect-square object-cover shadow-sm"
          />
        </div>
        <div className="md:ml-6 w-full text-center md:text-left">
          <h2 className="h3 font-bold text-gray-800 mb-2">{name}</h2>
          {username && <p className="text-gray-600 mb-2">@{username}</p>}
          <p className="text-gray-600 mb-2">{email}</p>
          {phoneNumber && <p className="text-gray-600 mb-2">{phoneNumber}</p>}
          {bio && <p className="text-gray-600 mb-4">{bio}</p>}

          <div className="mb-2">
            <p className="font-medium text-gray-700">Joined At:</p>
            <p className="text-gray-600">{formatDate(joinedAt)}</p>
          </div>
          <div className="mb-2">
            <p className="font-medium text-gray-700">Last Login:</p>
            <p className="text-gray-600">{formatDate(lastLogin)}</p>
          </div>

          {badges.length === 0 ? (
            <p className="text-gray-600 mt-4">No badges yet</p>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Badges:
              </h3>
              <div className="flex flex-wrap gap-2">
                {badges.map(badge => (
                  <span
                    key={badge._id}
                    className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded shadow-sm"
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

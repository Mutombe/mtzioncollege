import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, MapPin } from 'lucide-react';
//import { Card, CardContent, CardHeader, CardTitle } from "@mui/material";
import LoadingPage from '../Loading/loading';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/authSlice';
import { useEffect } from 'react';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const current_user = useSelector(
        (state) => state.auth.current_user
      );
    
    console.log("current user", current_user)
    
      useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

  //if (loading) {
    //return <LoadingPage />
  //}

  if (!current_user) {
    return <div className="flex justify-center items-center h-screen">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl mx-auto">
          <div>
            <div className="text-2xl font-bold text-center">User Profile</div>
          </div>
          <div>
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold">{current_user.data.user.username}</h2>
            </div>
            <div className="space-y-4">
              <ProfileItem icon={<Mail />} label="Email" value={current_user.data.user.email} />
              <ProfileItem icon={<User />} label="Username" value={current_user.data.user.username} />
              
              <ProfileItem icon={<Calendar />} label="Joined" value={new Date(current_user.data.user.date_joined).toLocaleDateString()} />
              <ProfileItem icon={<MapPin />} label="Location" value={current_user.data.user.locale || 'Not specified'} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
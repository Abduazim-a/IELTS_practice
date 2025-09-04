import React, { useState } from 'react';
import { Users, Upload, Settings, Plus, Trash2, Edit } from 'lucide-react';
import Header from '../Layout/Header';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserPhone, setNewUserPhone] = useState('');

  // Mock data
  const [users, setUsers] = useState([
    { phoneNumber: '+998771234567', name: 'John', surname: 'Doe', isAdmin: false, deviceCount: 1 },
    { phoneNumber: '+998887654321', name: 'Jane', surname: 'Smith', isAdmin: false, deviceCount: 2 },
  ]);

  const [tests, setTests] = useState([
    { id: 1, name: 'Listening Test 1', section: 'listening', uploadedAt: '2024-01-15' },
    { id: 2, name: 'Reading Test 1', section: 'reading', uploadedAt: '2024-01-16' },
  ]);

  const handleAddUser = () => {
    if (!newUserPhone.trim()) return;
    
    const newUser = {
      phoneNumber: newUserPhone,
      name: '',
      surname: '',
      isAdmin: false,
      deviceCount: 0
    };
    
    setUsers([...users, newUser]);
    setNewUserPhone('');
    setShowAddUser(false);
  };

  const handleRemoveUser = (phoneNumber: string) => {
    setUsers(users.filter(user => user.phoneNumber !== phoneNumber));
  };

  const tabs = [
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'tests', label: 'Manage Tests', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage users, tests, and system settings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Add User Section */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Student Management
                  </h2>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Student</span>
                  </button>
                </div>

                {/* Add User Form */}
                {showAddUser && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex space-x-3">
                      <input
                        type="tel"
                        value={newUserPhone}
                        onChange={(e) => setNewUserPhone(e.target.value)}
                        placeholder="+998 XX XXX XX XX"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={handleAddUser}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddUser(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Users List */}
                <div className="space-y-3">
                  {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name || 'No name'} {user.surname || ''}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.phoneNumber} • {user.deviceCount}/3 devices
                          </p>
                          {user.isAdmin && (
                            <span className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveUser(user.phoneNumber)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Test Management
                  </h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Test</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {tests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          test.section === 'listening' ? 'bg-blue-500' :
                          test.section === 'reading' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {test.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Uploaded on {test.uploadedAt}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Device Limit
                    </h3>
                    <input
                      type="number"
                      defaultValue={3}
                      min={1}
                      max={10}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Test Time Limit (minutes)
                    </h3>
                    <input
                      type="number"
                      defaultValue={30}
                      min={5}
                      max={180}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
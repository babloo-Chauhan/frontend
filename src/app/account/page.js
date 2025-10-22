"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  deleteAddress,
  getAddress,
  addAddress,
  updateAddress,
} from "@/context/AddressContext";
import { getUserDetails, updateUserRole } from "@/context/UserContext";
import { getUserOrder } from "@/context/OrdersContext";
import {
  Card,
  CardBody,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useApi } from "@/context/ApiContext";

const Account = () => {
  const router = useRouter();
  const { setusertoken } = useApi();
  const [activeTab, setActiveTab] = useState("Profile");
  const [userDetails, setUserDetails] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    address_line: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [editUserForm, setEditUserForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [editingUser, setEditingUser] = useState(false);

  const menuItems = [
    { name: "Profile", icon: <User size={20} /> },
    { name: "Orders", icon: <Package size={20} /> },
    { name: "Address", icon: <MapPin size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  // Logout
  const logout = () => {
    try {
      localStorage.clear();
      setusertoken("");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("role");
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout");
    }
  };

  // Address handling
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        const res = await updateAddress(editingAddress._id, addressForm);
        setAddresses(
          addresses.map((a) => (a._id === editingAddress._id ? res.data : a))
        );
        toast.success("Address updated successfully");
      } else {
        const res = await addAddress(addressForm);
        setAddresses([...addresses, res.data]);
        toast.success("Address added successfully");
      }
      setShowAddressDialog(false);
      setEditingAddress(null);
      setAddressForm({
        address_line: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    } catch {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (confirm("Delete this address?")) {
      try {
        await deleteAddress(id);
        setAddresses(addresses.filter((a) => a._id !== id));
        toast.success("Address deleted");
      } catch {
        toast.error("Failed to delete address");
      }
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressDialog(true);
  };

  // Fetch user, orders, addresses
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, orderRes, addrRes] = await Promise.all([
          getUserDetails(),
          getUserOrder(),
          getAddress(),
        ]);
        setUserDetails(userRes.data.data);
        setEditUserForm({
          name: userRes.data.data.name,
          email: userRes.data.data.email,
          mobile: userRes.data.data.mobile,
        });
        setOrders(orderRes.data.orders || []);
        setAddresses(addrRes.data.data);
      } catch (err) {
        toast.error("Failed to fetch account info");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Update user details
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...editUserForm };
      const res = await updateUserRole(userDetails._id, updatedData); // Using updateUserRole to update user data
      setUserDetails(res.data.data);
      toast.success("User details updated!");
      setEditingUser(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user details");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-5 border-r border-gray-100">
          <h2 className="text-xl font-bold text-indigo-600 mb-1">My Account</h2>
          <p className="text-gray-600 mb-6">Welcome, {userDetails.name}</p>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all ${
                  activeTab === item.name
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
            <button
              onClick={logout}
              className="flex items-center w-full gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg mt-4"
            >
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                {activeTab}
              </h1>

              {/* Profile */}
              {activeTab === "Profile" && (
                <div className="space-y-6">
                  {!editingUser ? (
                    <Card className="p-6 shadow-sm">
                      <CardBody>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <Typography className="font-semibold text-gray-800">
                              Name
                            </Typography>
                            <p className="text-gray-600">{userDetails.name}</p>
                          </div>
                          <div>
                            <Typography className="font-semibold text-gray-800">
                              Email
                            </Typography>
                            <p className="text-gray-600">{userDetails.email}</p>
                          </div>
                          <div>
                            <Typography className="font-semibold text-gray-800">
                              Mobile
                            </Typography>
                            <p className="text-gray-600">
                              {userDetails.mobile}
                            </p>
                          </div>
                        </div>
                        <Button
                          color="indigo"
                          onClick={() => setEditingUser(true)}
                          className="mt-4"
                        >
                          Edit Profile
                        </Button>
                      </CardBody>
                    </Card>
                  ) : (
                    <Card className="p-6 shadow-sm">
                      <CardBody>
                        <form onSubmit={handleUserUpdate} className="space-y-4">
                          <Input
                            label="Name"
                            value={editUserForm.name}
                            onChange={(e) =>
                              setEditUserForm({
                                ...editUserForm,
                                name: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Email"
                            value={editUserForm.email}
                            onChange={(e) =>
                              setEditUserForm({
                                ...editUserForm,
                                email: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Mobile"
                            value={editUserForm.mobile}
                            onChange={(e) =>
                              setEditUserForm({
                                ...editUserForm,
                                mobile: e.target.value,
                              })
                            }
                          />
                          <div className="flex gap-2">
                            <Button type="submit" color="indigo">
                              Update
                            </Button>
                            <Button
                              type="button"
                              color="red"
                              onClick={() => setEditingUser(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </CardBody>
                    </Card>
                  )}
                </div>
              )}

              {/* Orders */}
              {activeTab === "Orders" && (
                <div className="space-y-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-16">
                      <Package
                        className="mx-auto text-gray-400 mb-4"
                        size={40}
                      />
                      <h3 className="text-lg font-medium text-gray-700">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start shopping to see your orders here.
                      </p>
                      <Link
                        href="/products"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {orders.map((order) => (
                        <motion.div
                          key={order._id}
                          whileHover={{ scale: 1.02 }}
                          className="p-5 rounded-lg border bg-gray-50 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-gray-800">
                              #{order._id.slice(-6)}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                order.status === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-800 font-semibold">
                            Total: ₹{order.amount}
                          </p>
                          {order.userShipping && (
                            <div className="mt-2 text-gray-600 text-sm">
                              <p className="font-medium">Shipping:</p>
                              <p>{order.userShipping.address_line}</p>
                              <p>
                                {order.userShipping.city},{" "}
                                {order.userShipping.state},{" "}
                                {order.userShipping.country}
                              </p>
                              <p>Pincode: {order.userShipping.pincode}</p>
                              <p>Mobile: {order.userShipping.mobile}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Address and Settings tabs remain same as your current implementation */}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};

export default Account;

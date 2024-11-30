import { create } from "zustand";
import toast from "react-hot-toast";
import { useGroupChatStore } from "./useGroupChatStore";
import { axiosInstance } from "../lib/axios";

const { selectedGroup, setSelectedGroup, setGroups } = useGroupChatStore();

export const useGroupConfigStore = create((set) => ({
  groupData: [],
  isAddingMember: false,
  isUpdatingGroup: false,
  isRemovingMember: false,
  isExitingGroup: false,
  isDeletingGroup: false,
  isJoiningGroup: false,
  isCreatingGroup: false,

  addMember: async (userId) => {
    set({ isAddingMember: true });
    try {
      const res = await axiosInstance.post("/group/addMember", {
        userId,
        groupId: selectedGroup._id,
      });
      set({ groupData: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isAddingMember: false });
    }
  },

  removeMember: async (userId) => {
    set({ isRemovingMember: true });
    try {
      const res = await axiosInstance.post("/group/removeMember", {
        userId,
        groupId: selectedGroup._id,
      });
      set({ groupData: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isRemovingMember: false });
    }
  },

  updateGroup: async (data) => {
    set({ isUpdatingGroup: true });
    try {
      const res = await axiosInstance.patch("/group/updateGroup", data);
      set({ groupData: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatingGroup: false });
    }
  },

  deleteGroup: async () => {
    set({ isDeletingGroup: true });
    try {
      const res = await axiosInstance.delete("/group/deleteGroup", {
        groupId: selectedGroup._id,
      });
      setSelectedGroup(null);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isDeletingGroup: false });
    }
  },

  exitGroup: async () => {
    set({ isExitingGroup: true });
    try {
      const res = await axiosInstance.post("/group/exitGroup", {
        groupId: selectedGroup._id,
      });
      setSelectedGroup(null);
      setGroups(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isExitingGroup: false });
    }
  },

  joinGroup: async (groupId) => {
    set({ isJoiningGroup: true });
    try {
      const res = await axiosInstance.post("/group/joinGroup", { groupId });
      setGroups(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isJoiningGroup: false });
    }
  },

  createGroup: async (name) => {
    set({ isCreatingGroup: true });
    try {
        const res = await axiosInstance.post("/group/create");
        setSelectedGroup(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isCreatingGroup: false });
    }
  },
}));
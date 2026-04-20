import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../ui/DataTable"
import user1 from "../../../assets/users/user_1.svg"
import user2 from "../../../assets/users/user_2.svg"
import user3 from "../../../assets/users/user_3.svg"
import user4 from "../../../assets/users/user_4.svg"
import user5 from "../../../assets/users/user_5.svg"
import { FaCircle } from "react-icons/fa"
import { useTheme } from "./ThemeContext"

export type User = {
    id: string
    avatar: string
    name: string
    status: "Online" | "Offline"
    role: string
    last_workflow: Date
}

const colours = {
    Editor: "bg-orange-500",
    Viewer: "bg-purple-500",
    Admin: "bg-blue-500"
}
 
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "avatar",
        header: "",
        cell: ({ getValue }) => (
            <img
                src={getValue<string>()}
                alt="Avatar"
            />
        )
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => {
            const role = getValue<string>()
            return (
                <span className={`font-medium rounded-full px-2 py-1 text-[13px] ${colours[role]} text-white`}>
                    {role}
                </span>
            )
        },
    },
    {
        accessorKey: "last_workflow",
        header: "Last Workflow",
        cell: ({ getValue }) => getValue<Date>().toLocaleDateString(),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const { darkMode } = useTheme()
            const status = getValue<string>()

            return (
                <span className={`flex gap-1 items-center font-medium rounded-full px-2.5 py-1 text-[13px] w-fit ${status === "Online" ? "bg-green-100 text-green-500" : darkMode ? "text-[#FFFFFF75]" : "text-[#7F7F7F]"} duration-300 transition-colors`}>
                    {status === "Online" && <FaCircle size={5} className='animate-pulse'/>}
                    {status}
                </span>
            )
        },
    },
]

const data: User[] = [
    { 
        id: "1", 
        avatar: user1,
        name: "Sarah Chen", 
        status: "Online", 
        role: "Admin", 
        last_workflow: new Date("2026-04-16") 
    },
    { 
        id: "2", 
        avatar: user5,
        name: "James Okafor", 
        status: "Online", 
        role: "Editor", 
        last_workflow: new Date("2026-04-15") 
    },
    { 
        id: "3", 
        avatar: user2,
        name: "Priya Sharma", 
        status: "Offline", 
        role: "Viewer", 
        last_workflow: new Date("2026-04-12") 
    },
    { 
        id: "4", 
        avatar: user3,
        name: "Luca Rossi", 
        status: "Online", 
        role: "Editor", 
        last_workflow: new Date("2026-04-14") 
    },
    // { 
    //     id: "5", 
    //     avatar: user4,
    //     name: "Maya Thompson", 
    //     status: "Offline", 
    //     role: "Admin", 
    //     last_workflow: new Date("2026-04-10") 
    // },
]

const UsersBox = () => {
    const { darkMode } = useTheme()

    return (
        <DataTable 
            columns={columns} 
            data={data} 
            darkMode={darkMode}
        />
    )
}

export default UsersBox
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
    clearAllSoftwareApplicationErrors,
    deleteApplication,
    getAllApplications,
    resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);
    const { projects } = useSelector((state) => state.project);
    const { skills } = useSelector((state) => state.skill);
    const { applications, error, message, loading } = useSelector(
        (state) => state.application
    );
    const { timeline } = useSelector((state) => state.timeline);

    const dispatch = useDispatch();

    const [appId, setAppId] = useState("");

    const handleDeleteSoftwareApp = (id) => {
        setAppId(id);
        dispatch(deleteApplication(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllSoftwareApplicationErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetSoftwareApplicationSlice());
            dispatch(getAllApplications());
        }
    }, [dispatch, error, message, loading]);

    return (
        <>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="flex flex-col justify-between sm:col-span-2 h-full">
                                <CardHeader className="pb-3">
                                    <CardDescription className="max-w-full text-balance leading-relaxed">
                                        {user.aboutMe}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link
                                        to={user.portfolioURL}
                                        target="_blank"
                                    >
                                        <Button>Visit Portfolio</Button>
                                    </Link>
                                </CardFooter>
                            </Card>

                            <Card className="flex flex-col justify-between h-full">
                                <CardHeader className="pb-2">
                                    <CardTitle>Projects Completed</CardTitle>
                                    <CardTitle className="text-5xl">
                                        {projects && projects.length}
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Link to={"/manage/projects"}>
                                        <Button>Manage Projects</Button>
                                    </Link>
                                </CardFooter>
                            </Card>

                            <Card className="flex flex-col justify-between h-full">
                                <CardHeader className="pb-2">
                                    <CardTitle>Skills</CardTitle>
                                    <CardTitle className="text-5xl">
                                        {skills && skills.length}
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Link to={"/manage/skills"}>
                                        <Button>Manage Skills</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs>
                            <TabsContent>
                                <Card>
                                    <CardHeader className="px-7">
                                        <CardTitle>Projects</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Description
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Stack
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Github
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Deployed
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        Update
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        Visit
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects &&
                                                projects.length > 0 ? (
                                                    projects.map((element) => (
                                                        <TableRow
                                                            className="bg-accent"
                                                            key={element._id}
                                                        >
                                                            <TableCell>
                                                                <div className="font-semibold">
                                                                    {
                                                                        element.title
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="font-semibold max-w-xs truncate">
                                                                    {element
                                                                        .description
                                                                        .length >
                                                                    50
                                                                        ? element.description.substring(
                                                                              0,
                                                                              25
                                                                          ) +
                                                                          "..."
                                                                        : element.description}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="font-semibold">
                                                                    {
                                                                        element.stack
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="font-semibold">
                                                                    <a
                                                                        href={
                                                                            element.gitRepoLink
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {
                                                                            element.gitRepoLink
                                                                        }
                                                                    </a>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="font-semibold">
                                                                    {
                                                                        element.deployed
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Link
                                                                    to={`/update/project/${element._id}`}
                                                                >
                                                                    <Button>
                                                                        Update
                                                                    </Button>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                {element.projectLink ? (
                                                                    <Link
                                                                        to={
                                                                            element.projectLink
                                                                        }
                                                                        target="_blank"
                                                                    >
                                                                        <Button>
                                                                            Visit
                                                                        </Button>
                                                                    </Link>
                                                                ) : (
                                                                    <Button
                                                                        disabled
                                                                    >
                                                                        Visit
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={7}
                                                            className="text-center"
                                                        >
                                                            No projects
                                                            available
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        <Tabs>
                            <TabsContent>
                                <Card>
                                    <CardHeader className="px-7 gap-3">
                                        <CardTitle>Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid sm:grid-cols-2 gap-4">
                                        {skills && skills.length > 0 ? (
                                            skills.map((element) => {
                                                return (
                                                    <Card
                                                        key={element._id}
                                                        className="flex flex-col justify-between"
                                                    >
                                                        <CardHeader className="pb-3">
                                                            <div className="font-semibold text-lg">
                                                                {element.title}
                                                            </div>
                                                        </CardHeader>
                                                        <CardFooter className="flex items-center">
                                                            <div className="w-full">
                                                                <Progress
                                                                    value={
                                                                        element.proficiency
                                                                    }
                                                                    max={100}
                                                                    className="h-2.5"
                                                                />
                                                                <div className="text-sm text-gray-500 mt-1">
                                                                    {
                                                                        element.proficiency
                                                                    }
                                                                    %
                                                                </div>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                );
                                            })
                                        ) : (
                                            <p className="text-3xl overflow-y-hidden ">
                                                No Skills available
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        <Tabs>
                            <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="px-7">
                                        <CardTitle>
                                            Software Applications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead className="md:table-cell">
                                                        Icon
                                                    </TableHead>
                                                    <TableHead className="md:table-cell text-center">
                                                        Action
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {applications &&
                                                applications.length > 0 ? (
                                                    applications.map(
                                                        (element) => (
                                                            <TableRow
                                                                className="bg-accent"
                                                                key={
                                                                    element._id
                                                                }
                                                            >
                                                                <TableCell>
                                                                    <div className="font-semibold">
                                                                        {
                                                                            element.name
                                                                        }
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="md:table-cell text-center">
                                                                    <img
                                                                        src={
                                                                            element
                                                                                .image
                                                                                .url
                                                                        }
                                                                        alt={`${element.name} icon`}
                                                                        className="w-7 h-7"
                                                                    />
                                                                </TableCell>
                                                                <TableCell className="md:table-cell text-center">
                                                                    {loading &&
                                                                    appId ===
                                                                        element._id ? (
                                                                        <SpecialLoadingButton
                                                                            width={
                                                                                "w-fit"
                                                                            }
                                                                            content={
                                                                                "Deleting"
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleDeleteSoftwareApp(
                                                                                    element._id
                                                                                )
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={3}
                                                            className="text-center"
                                                        >
                                                            No Software
                                                            Applications added
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="px-7 flex items-center justify-between flex-row">
                                        <CardTitle>Timeline</CardTitle>
                                        <Link to={"/manage/timeline"}>
                                            <Button>Manage Timeline</Button>
                                        </Link>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead className="text-center">
                                                        From
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        To
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {timeline &&
                                                timeline.length > 0 ? (
                                                    timeline.map((element) => (
                                                        <TableRow
                                                            className="bg-accent"
                                                            key={element._id}
                                                        >
                                                            <TableCell className="font-medium">
                                                                {element.title}
                                                            </TableCell>
                                                            <TableCell className="font-semibold text-center">
                                                                {
                                                                    element
                                                                        .timeline
                                                                        .from
                                                                }
                                                            </TableCell>
                                                            <TableCell className="font-semibold text-center">
                                                                {element
                                                                    .timeline.to
                                                                    ? `${element.timeline.to}`
                                                                    : "Present"}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={3}
                                                            className="text-center"
                                                        >
                                                            You have not added
                                                            any Timeline
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;

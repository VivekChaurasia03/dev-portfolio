import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <div className="w-full h-full">
                <div>
                    <div className="grid w-[100%] gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Profile</h1>
                            <p className="mb-5">Full Profile Preview</p>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                            <div className="grid gap-2 w-full sm:w-72">
                                <label>Profile Image</label>
                                <img
                                    src={user && user.avatar && user.avatar.url}
                                    alt="avatar"
                                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl "
                                />
                            </div>
                            <div className="grid gap-2 w-full sm:w-72">
                                <label>Resume</label>
                                <img
                                    src={user && user.resume && user.resume.url}
                                    alt="resume"
                                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl "
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label>Full Name</label>
                            <Input
                                type="text"
                                defaultValue={user.fullName}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Email</label>
                            <Input
                                type="text"
                                defaultValue={user.email}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Phone</label>
                            <Input
                                type="text"
                                defaultValue={user.phone}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>About Me</label>
                            <Textarea defaultValue={user.aboutMe} disabled />
                        </div>
                        <div className="grid gap-2">
                            <label>Portfolio URL</label>
                            <Input
                                type="text"
                                defaultValue={user.portfolioURL}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Github</label>
                            <Input
                                type="text"
                                defaultValue={user.githubURL}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>LinkedIn</label>
                            <Input
                                type="text"
                                defaultValue={user.linkedInURL}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Twitter (X)</label>
                            <Input
                                type="text"
                                defaultValue={user.twitterURL}
                                disabled
                            />
                        </div>
                        <div className="grid gap-2">
                            <label>Instagram</label>
                            <Input
                                type="text"
                                defaultValue={user.instagramURL}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

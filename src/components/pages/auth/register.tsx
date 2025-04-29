import { HeartPulseGradientIcon } from "@/assets/HeartPulseGradient";
import AuthBreadcrumb from "@/components/spec/auth/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RegisterFormData } from "@/model/auth-model";
import { useRegister } from "@/services/hooks/auth-hooks";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SignupPage() {
    const [stage, setStage] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        height: "",
        weight: "",
        goal: "",
        experience: "",
    });

    const onRegisterSuccess = (_data: any) => {
        toast.success("Registration successful");
    };

    const onRegisterError = (_error: any) => {
        toast.error("Registration failed");
    };

    const registerMutation = useRegister(onRegisterSuccess, onRegisterError);

    const validateFirstStage = () => {
        const { name, email, password, confirmPassword } = formData;
        if (!name || !email || !password || !confirmPassword) {
            return false;
        }
        if (password !== confirmPassword) {
            return false;
        }
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: RegisterFormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (
        name: keyof RegisterFormData,
        value: string
    ) => {
        setFormData((prev: RegisterFormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerMutation.mutate({
            email: formData.email,
            password: formData.password,
            username: formData.name,
            birthDate: formData.dob,
            height: parseInt(formData.height),
            weight: parseInt(formData.weight),
            experienceLevel: formData.experience,
            fitnessGoal: formData.goal,
        });
    };

    const handleBreadcrumbClick = () => {
        setStage(0);
    };

    const handleNextClick = () => {
        if (!validateFirstStage()) {
            toast.error("Please fill all fields and ensure passwords match.");
            return;
        }
        setStage(1);
    };

    return (
        <div className="flex flex-col px-5 pt-20 h-screen">
            <div className="flex flex-col items-center pb-12 gap-3">
                <HeartPulseGradientIcon size={60} />
                <h1 className="text-3xl">Fitter / Happier</h1>
                <p className="text-lg font-extralight text-gray-500">
                    More Productive. Comfortable.
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <Card>
                    {stage === 0 ? (
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>
                                Create an account to get started.
                            </CardDescription>
                        </CardHeader>
                    ) : (
                        <CardHeader>
                            <CardTitle>
                                <AuthBreadcrumb
                                    handleClick={handleBreadcrumbClick}
                                />
                            </CardTitle>
                        </CardHeader>
                    )}
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            {stage === 0 && (
                                <div className="flex flex-col gap-6">
                                    <Separator />
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirm-password">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirm-password"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {stage === 1 && (
                                <div className="flex flex-col gap-6 px-2">
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <p>Date of Birth</p>
                                        <Input
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            required
                                            value={formData.dob}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="pb-2">Height</p>
                                            <div className="flex gap-2 items-center">
                                                <Input
                                                    id="height"
                                                    name="height"
                                                    type="number"
                                                    required
                                                    value={formData.height}
                                                    onChange={handleChange}
                                                />
                                                <p>cm</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="pb-2">Weight</p>
                                            <div className="flex gap-2 items-center">
                                                <Input
                                                    id="weight"
                                                    name="weight"
                                                    type="number"
                                                    required
                                                    value={formData.weight}
                                                    onChange={handleChange}
                                                />
                                                <p>kg</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 items-center">
                                        <Select
                                            value={formData.goal}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "goal",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Goal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="gain">
                                                        Gain it!
                                                    </SelectItem>
                                                    <SelectItem value="lose">
                                                        Lose it!
                                                    </SelectItem>
                                                    <SelectItem value="maintain">
                                                        Maintain it!
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={formData.experience}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "experience",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Experience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="beginner">
                                                        Beginner
                                                    </SelectItem>
                                                    <SelectItem value="intermediate">
                                                        Intermediate
                                                    </SelectItem>
                                                    <SelectItem value="freak">
                                                        Gym Freak
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="manaal"
                                                        className="text-red-500"
                                                    >
                                                        Manaal
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                            <div className="pt-12 flex gap-6 items-center justify-center px-5">
                                {stage === 1 && (
                                    <Button
                                        variant={"outline"}
                                        className="w-1/2"
                                        onClick={() => setStage(0)}
                                        type="button"
                                    >
                                        <ChevronLeft />
                                        Back
                                    </Button>
                                )}
                                {stage === 0 && (
                                    <Button
                                        className="w-full"
                                        onClick={handleNextClick}
                                        type="button"
                                    >
                                        Next <ChevronRight />
                                    </Button>
                                )}
                                {stage === 1 && (
                                    <Button className="w-1/2" type="submit">
                                        Signup <Check />
                                    </Button>
                                )}
                            </div>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a
                                href="/auth/login"
                                className="underline underline-offset-4 text-primary"
                            >
                                Login
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

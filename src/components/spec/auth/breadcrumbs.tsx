import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AuthBreadcrumb = ({
    handleClick,
}: {
    handleClick: () => void;
}) => {
    return (
        <div className="flex items-center justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="text-xl">
                        <BreadcrumbLink onClick={handleClick}>Register</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage className="text-primary">
                            Profile
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default AuthBreadcrumb;

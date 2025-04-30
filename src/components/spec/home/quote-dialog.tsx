import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useGetMotivationQuote } from "@/services/hooks/ai-hooks";
import { Quote } from "lucide-react";

const QuoteDialog = () => {
    const motivationMutation = useGetMotivationQuote();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => motivationMutation.mutate("depressed")}>
                    <Quote className="text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {motivationMutation.isPending && <Spinner />}
                {motivationMutation.isError && (
                    <p>You are so fucking demotivated that even the AI gave up.</p>
                )}
                {motivationMutation.isSuccess && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Greep's words of wisdom</DialogTitle>
                            <DialogDescription>Let Greep motivate you</DialogDescription>
                        </DialogHeader>
                        <div className="flex text-center text-primary">
                            {motivationMutation.data.response}
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button className="w-full">Lets go !</Button>
                            </DialogClose>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default QuoteDialog;

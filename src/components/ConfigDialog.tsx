import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { configSchema, ConfigSchema } from "@/schema/config";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/Dialog";

type Props = {
    config: ConfigSchema,
    onSubmit: (config: ConfigSchema) => void,
    children: ReactNode
}

const ConfigDialog = ({ config, onSubmit, children }: Props) => {
    const configForm = useForm<ConfigSchema>({
        resolver: zodResolver(configSchema),
        defaultValues: {
            query: config.query,
            refreshInterval: config.refreshInterval
        }
    });

    // const onSubmit = (data: ConfigSchema) => onConfigSubmit(data);

    return (
        <Dialog>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle className="mb-2">Configuration</DialogTitle>
                    <DialogDescription>
                        The configuration is stored in the local storage of your browser. The entered values affect the displayed
                        photos in the
                        background.
                    </DialogDescription>
                </DialogHeader>

                {/* Config Form */ }
                <Form { ...configForm }>
                    <form onSubmit={ configForm.handleSubmit(onSubmit) } className="flex flex-col gap-y-5">

                        <FormField name="query" control={ configForm.control } render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Search term</FormLabel>
                                <FormControl>
                                    <Input placeholder="Search term" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    The specified term will be used to search for photos
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) } />

                        <FormField name="refreshInterval" control={ configForm.control } render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Refresh interval</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Refresh interval" { ...field } />
                                </FormControl>
                                <FormDescription>
                                    Photo refresh interval in minutes
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) } />

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export { ConfigDialog };

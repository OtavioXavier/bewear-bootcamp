'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z.email("Endereço de email inválido"),
    password: z.string().min(8, "Senha pequena: Precisa ter ao menos 8 caracteres")
})

type formValues = z.infer<typeof formSchema>

const SignInForm = () => {
    const router = useRouter();

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: formValues) => {


        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Login, concluido com sucesso!")
                    router.push("/")
                },
                onError: (ctx) => {
                    if (ctx.error.code === "USER_NOT_FOUND") {
                        toast.error("E-mail não encontrado.")
                        return form.setError("email", {
                            message: "E-mail nao encontrado"
                        });
                    }
                    if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                        toast.error("E-mail ou senha inválidos.")
                        form.setError("email", {
                            message: "E-mail ou senha inválidos."
                        });
                        return form.setError("password", {
                            message: "E-mail ou senha inválidos."
                        });
                    }
                    toast.error(ctx.error.message)
                }
            }
        })
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Entrar</CardTitle>
                    <CardDescription>
                        Faça login para continuar.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="grid gap-6 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="digite seu email..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="digite sua senha..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button>Entrar</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card >
        </>
    );
}

export default SignInForm;
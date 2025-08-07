import Header from "@/components/commom/header"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import SignInForm from "./components/sign-in-form"
import SignUpForm from "./components/sign-up-form"

const Authentication = () => {
    return (
        <>
            <Header />
            <div className="flex w-full flex-col gap-6 px-5">
                <Tabs defaultValue="sign-in">
                    <TabsList>
                        <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                        <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
                    </TabsList>
                    <TabsContent className="w-full" value="sign-in">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent className="w-full" value="sign-up">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Authentication;
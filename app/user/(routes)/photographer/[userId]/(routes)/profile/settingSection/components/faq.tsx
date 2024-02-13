"use client"

import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Faq =() =>{
    return(
        <Card className="border-none">
            <CardHeader>
                <CardTitle className="text-5xl font-['Inter']">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I get started?</AccordionTrigger>
                        <AccordionContent>
                            You can get started by creating an account and adding your bank details.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do I get paid?</AccordionTrigger>
                        <AccordionContent>
                            You can get paid by adding your bank details and withdrawing your earnings.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do I add a category?</AccordionTrigger>
                        <AccordionContent>
                            You can add a category by clicking the "Add Category" button and filling out the form.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

    );
}
export default Faq;
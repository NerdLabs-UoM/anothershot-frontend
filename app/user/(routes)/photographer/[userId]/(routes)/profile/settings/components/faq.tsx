"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FaqSection = () => {
    return (
        <div className="w-[100%]">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-start">How do I get started?</AccordionTrigger>
                    <AccordionContent>
                        You can get started by creating an account and adding your bank details.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-start">How do I get paid?</AccordionTrigger>
                    <AccordionContent>
                        You can get paid by adding your bank details and withdrawing your earnings.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-start">How do I add a category?</AccordionTrigger>
                    <AccordionContent>
                        You can add a category by clicking the "Add Category" button and filling out the form.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
export default FaqSection;
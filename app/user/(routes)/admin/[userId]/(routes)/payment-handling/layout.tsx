type PaymentManagementLayoutProps = {
    children: React.ReactNode;
}

const paymentManagement = (props: PaymentManagementLayoutProps) => {

    return (
        <div className="w-full px-20">
            {props.children}
        </div>
    );
}

export default paymentManagement;
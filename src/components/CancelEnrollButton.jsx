// "use client";


// import { AlertDialog, Button } from "@heroui/react";

// const CancelEnrollButton = () => {

//     return (
//         <AlertDialog>
//             <Button
//                 color="danger"
//                 variant="light"
//                 size="sm"
//             >
//                 Cancel
//             </Button>
//             <AlertDialog.Backdrop>
//                 <AlertDialog.Container>
//                     <AlertDialog.Dialog className="sm:max-w-100">
//                         <AlertDialog.CloseTrigger />
//                         <AlertDialog.Header>
//                             <AlertDialog.Icon status="danger" />
//                             <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
//                         </AlertDialog.Header>
//                         <AlertDialog.Body>
//                             <p className="text-slate-600">
//                                 Are you sure you want to cancel this enrollment? This action cannot be undone and you
//                                 will lose access to the course materials.
//                             </p>
//                         </AlertDialog.Body>
//                         <AlertDialog.Footer>
//                             <Button
//                                 slot="close"
//                                 variant="tertiary"
//                             >
//                                 Keep Enrollment
//                             </Button>
//                             <Button
//                                 slot="close"
//                                 color="danger"
//                                 className="font-bold"

//                             >
//                                 Yes, Cancel
//                             </Button>
//                         </AlertDialog.Footer>
//                     </AlertDialog.Dialog>
//                 </AlertDialog.Container>
//             </AlertDialog.Backdrop>
//         </AlertDialog>
//     );
// };

// export default CancelEnrollButton;



"use client";

import { AlertDialog, Button } from "@heroui/react";

const CancelEnrollButton = () => {

    return (
        <AlertDialog>
            <Button
                color="danger"
                variant="light"
                size="sm"
                className="hover:bg-danger/10 font-medium"
            >
                Cancel
            </Button>
            <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/40">
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100 bg-[#16181d] border border-[#22252e] rounded-3xl shadow-2xl">
                        <AlertDialog.CloseTrigger className="text-gray-400 hover:text-white" />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading className="text-white font-black tracking-tight">Confirm Cancellation</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p className="text-gray-400 font-medium">
                                Are you sure you want to cancel this enrollment? This action cannot be undone and you
                                will lose access to the course materials.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                                className="bg-[#1f222a] border border-[#2a2d36] text-white hover:bg-[#2a2d36] font-bold rounded-xl"
                            >
                                Keep Enrollment
                            </Button>
                            <Button
                                slot="close"
                                color="danger"
                                className="font-bold rounded-xl bg-danger text-white hover:bg-danger-600 transition-colors"
                            >
                                Yes, Cancel
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CancelEnrollButton;
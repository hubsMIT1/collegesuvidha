import React from "react";
function ChatList() {
    let msg = "In this code, if the length of text is less than or equal to 30 characters, it will display the entire text. If the length exceeds 30 characters, it will display the first 30 characters followed by an ellipsis"
    return (
        // <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
        <div className="h-full">
            {/* Card */}
            <div className="relative  mx-auto bg-white shadow-lg rounded-lg">
                {/* Card header */}
                <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                    {/* ... (header content) ... */}
                    <h2 className="text-2xl font-semibold mb-4">Chats Section</h2>
                </header>
                {/* Card body */}
                <div className="py-3 px-5">
                    {/* <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3> */}
                    {/* Chat list */}
                    <div className="divide-y divide-gray-200">
                        {/* ... (chat list content) ... */}

                        {
                            Array.from({ length: 5 }, (_, i) => (
                                <button key={i} class="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                                    <div class="flex items-center">
                                        <img class="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg" width="32" height="32" alt="Nhu Cassel" />
                                        <div className="w-full">
                                            <h4 className="text-sm font-semibold text-gray-900">Nhu Cassel</h4>
                                            <div className="w-full text-[13px] flex"><p className="relative flex grow">{msg.length <= 30 ? msg : msg.slice(0, 30) + '...'} 👋, </p> <p> 24, Mar</p></div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        }



                    </div>
                </div>

            </div>
        </div>
        // </section>
    );
}

export default ChatList;

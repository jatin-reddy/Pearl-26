import SectionHeading from "./SectionHeading";
import MovingTape from "./Tape";

const ProShows = () => {
    return (
        <>
            <section className="relative w-full min-h-screen h-auto bg-[#323132] text-white overflow-x-hidden flex flex-col font-sans py-10 md:py-20">

                {/* Section Heading*/}
                <SectionHeading
                    text1="OUR"
                    text2="PROSHOWS"
                    ghostText="OUR PROSHOWS"
                    text1Color="text-white"
                    text2Color="text-[#22D3EE]"
                />

                {/* Content area */}
                <main className="relative flex-1 min-h-[500px] md:min-h-[750px] flex items-center justify-center w-full overflow-hidden">

                    {/* Comic placeholder panel */}
                    <div className="relative w-full max-w-6xl mx-auto px-6">
                        <div className="relative mx-auto w-full md:max-w-[900px]">

                            <div
                                className="bg-[#E5E5E5] border-4 border-[#22D3EE] p-6 md:p-12 w-full"
                                style={{
                                    aspectRatio: '2044 / 1108',
                                }}
                            >
                                {/* placeholder for comic panel*/}
                                <div className="flex items-center justify-center h-full">
                                    <p
                                        className="font-poppins text-black text-center font-medium"
                                        style={{
                                            fontSize: 'clamp(16px, 1.25vw, 20px)',
                                        }}
                                    >
                                        Similar to brochure, the 3<br />
                                        artists in COMMON comic<br />
                                        panel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </section>
            <MovingTape />
        </>
    );
};

export default ProShows;
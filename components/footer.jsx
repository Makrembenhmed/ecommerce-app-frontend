import { MailIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import whatsapp from "../public/WhatsAppButtonGreenSmall.svg";

export default function Footer() {
    return (
        <footer className="pb-10 md:px-5 md:pb-20">
            <section className="container mx-auto pt-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h2 className="mb-3 text-lg font-bold">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="text-sm hover:underline"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-sm hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/return-refund-policy"
                                    className="text-sm hover:underline"
                                >
                                    Return and Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-lg font-bold">Contact Us</h2>
                        <div className="mb-3 flex gap-2 text-sm hover:underline">
                            <MailIcon size={16} />
                            <Link href="mailto:info@oxabags.com">info@oxabags.com</Link>
                        </div>
                        <div className="mb-3 flex gap-2 text-sm hover:underline">
                            <PhoneCallIcon size={16} />
                            <Link href="tel:9868151526">9868151526</Link>
                        </div>
                        <div className="mb-3 flex gap-2 text-sm hover:underline">
                            <PhoneCallIcon size={16} />
                            <Link href="tel:9811365888">9811365888</Link>
                        </div>
                        <div className="w-fit">
                            <Link
                                href={"https://wa.me/0021655500005"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    loading="lazy"
                                    className="rounded-lg border border-black/20"
                                    width={140}
                                    src={whatsapp}
                                    alt="whatsapp"
                                />
                            </Link>
                        </div>
                        <div className="mt-2 flex space-x-4">
                            <Link
                                href="https://www.facebook.com/ben.h.makrem"
                                className="text-sm hover:underline"
                            >
                                Facebook
                            </Link>
                            <Link
                                href="https://www.twitter.com/amanasia"
                                className="text-sm hover:underline"
                            >
                                Twitter
                            </Link>
                            <Link
                                href="https://www.instagram.com/amanasia"
                                className="text-sm hover:underline"
                            >
                                Instagram
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-3 text-xl font-bold">ITCA Enterprises</h2>
                        <Link
                            href="https://maps.app.goo.gl/diaZLM6SnYkpa6LV7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm hover:underline"
                        >
                            G-211, UPSIDC Industrial Area Phase-1 M. G. Road, Dholana
                            GHAZIABAD -201015, UP
                        </Link>
                    </div>
                </div>
            </section>
            <p className="mt-10 text-center text-sm">
                © {new Date().getFullYear()} International Trading Company Of Africa
            </p>
        </footer>
    );
}
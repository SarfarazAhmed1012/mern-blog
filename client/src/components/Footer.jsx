import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 mb-5">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Ahmed's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="ABOUT" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  Other Projects
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  About me
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="FOLLOW ME" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  GITHUB
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  LINKEDIN
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  DISCORD
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  Privacy Policy
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  Terms and conditions
                </Footer.Link>

                <Footer.Link href="#" target="_blank" rel="noreferrer noopener">
                  100 JS Projects
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
          <Footer.Copyright
            href="#"
            by="Sarfaraz Ahmed"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-2 mt-4 ">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;

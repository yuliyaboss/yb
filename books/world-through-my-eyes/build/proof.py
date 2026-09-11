from lib_ext import *
import charlib as cl

def cast_proof():
    b = []
    b.append(cl.LINE(70, 400, 790, 400, 4))
    b.append(mia("wave", 1.30, 150, 400))
    b.append(leo("down", 1.25, 300, 400))
    b.append(waffles(560, 400, 1.0))
    b.append(cl.LINE(70, 760, 790, 760, 4))
    b.append(momo(140, 760, 0.85))
    b.append(pip(250, 760, 0.6))
    b.append(cl.G(420, 700, dachshund_sleep(WAFFLES), 0.9))
    b.append(paper_plane(660, 690, 0.8))
    b.append(wonder_star(720, 780))
    return bpage("Cast Proof Sheet", "".join(b))

if __name__ == "__main__":
    cl.build([("00-proof", cast_proof)], ".", pdf_name="proof.pdf")

## NSFW-ROOP AI 

- DOWNLOAD PYTHON 3.10.9 and GIT, GIT LFS
	- >   https://www.python.org/ftp/python/3.10.9/python-3.10.9-amd64.exe
	- >   https://git-scm.com/downloads
  - >   https://github.com/git-lfs/git-lfs/releases/download/v3.4.0/git-lfs-windows-v3.4.0.exe

- CLONE NSFW-ROOP
  - >   https://github.com/GosuDRM/nsfw-roop.git

- CREATE PYTHON VENV
	- >     python -m venv NAME_OF_VENV
	- >     activate NAME_OF_VENV\Scripts\activate.bat

- UPDATE PIP - make sure you are in VENV
	- >     python -m pip install --upgrade pip

- GET MICROSOFT VISUAL C++ 2015
	- >     winget install -e --id Microsoft.VCRedist.2015+.x64

- DOWNLOAD VISUAL CPP BUILD TOOLS
	- >    https://visualstudio.microsoft.com/visual-cpp-build-tools/
	- After opening visual studio installler, check:
		* GET 'Visual Studio Build Tools', modify individual components
		- .NET Framework 4.7.2 targeting pack
		- .NET Framework 4.8 SDK
		- Code Tools: Text Template Transformation
		- Compilers - C++ 2022 Redistributable Update
		- Compilers - C++ Clang Compiller for Windows (14.0.5)
		- Compilers - C++ Clang-cl from v143 build tools (x64/x86)
		- Compilers - CMake tools for windows
		- Compilers - Modules for v143 build tools (x64/x86 - experimental)
		- Compilers - C++ /CLI suppoer for v143 build tools (Latest)
		- Compilers - MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)
		- Debugging - C++ AddressSanitizer
		- Debugging - Testing tools core features - Build Tools
		- Development - C++ Build Tools core features
		- Development - C++ core features
		- SDK - C++ ATL for latest v143 build tools (x86 & x64)
		- SDK - C++ MFC for atest v143 build toolls (x86 & x64)
		- Windows 'X' SDK
		- Windows Universal C Runtime

- GET FFMPEG
	- >     winget install -e --id Gyan.FFmpeg
	- manually https://github.com/GyanD/codexffmpeg/releases and add to PATH
	- >     shutdown /r

- DOWNLOAD CUDNN
  - >    https://huggingface.co/MonsterMMORPG/SECourses/resolve/main/cudnn%208.7.0.84.zip
	- PUT INTO **C:\NVIDIA\CUDNN\8.7.0.84\bin**
	- ADD TO ENV PATH

- DOWNLOAD MODEL
	- >    https://huggingface.co/ezioruan/inswapper_128.onnx/resolve/main/inswapper_128.onnx
	- PUT TO **/models/inswapper_128.onnx**

- DOWNLOAD GFPGAN
	- >    https://github.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth
  - PUT TO **/models/GFPGANv1.4.pth**

- FOR AMD ONLY
- >       pip install onnxruntime-directml==1.15.1

- DOWNLOAD CUDA ToolKit 11.8
	- >    https://developer.nvidia.com/cuda-11-8-0-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local

- DOWNLOAD TORCH
	- >    https://download.pytorch.org/whl/cu118/torch-2.0.1%2Bcu118-cp310-cp310-win_amd64.whl
	- >     pip install torch-2.0.1%2Bcu118-cp310-cp310-win_amd64.whl
	- >     pip3 install torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

- INSTALL requirements.txt
-   >     pip install -r requirements.txt

- RUN
	- USE **--execution-provider** dml IF YOU HAVE GPU, ELSE YOU CAN USE DIRECTML 
	- **--S** MUST BE IMAGE, --T MUST BE VIDEO
	- python run.py **--s** content/x.jpg **--t** content/x.mp4 **--o** content/EDITED_NSFW.mp4 **--execution-provider** dml **--execution-threads** 1 **--frame-processor** face_swapper face_enhancer
	- python run.py **--s** content/jj2.jpg **--t** content/video2.mp4 **--o** content/EDITED_NSFW_LOW2.mp4 **--execution-provider** cpu **--frame-processor** face_swapper


- CUSTOM REQUIREMENTS

>	--extra-index-url https://download.pytorch.org/whl/cu118

>	numpy==1.23.5
>	opencv-python==4.7.0.72
>	onnx==1.14.0
>	insightface==0.7.3
>	psutil==5.9.5
>	tk==0.1.0
>	customtkinter==5.1.3
>	pillow==9.5.0
>	onnxruntime==1.15.0; sys_platform == 'darwin' and platform_machine != 'arm64'
>	onnxruntime-silicon==1.13.1; sys_platform == 'darwin' and platform_machine == 'arm64'
>	onnxruntime-gpu==1.15.0; sys_platform != 'darwin'
>	tensorflow==2.13.0rc1; sys_platform == 'darwin'
>	tensorflow==2.12.0; sys_platform != 'darwin'
>	opennsfw2==0.10.2
>	protobuf==4.23.2
>	tqdm==4.65.0
>	gfpgan==1.3.8

require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-version-check"
  s.version      = package["version"]
  s.summary      = package["description"]

  s.homepage     = package["homepage"]

  s.license      = package["license"]
  s.authors      = { "kimxogus" => "kgyoo8232@gmail.com" }
  s.platform     = :ios, "7.0"

  s.source       = { :git => package["repository"]["url"] }

  s.source_files  = "ios/RNVersionCheck.{h,m}"

  s.preserve_paths= "package.json", "LICENSE"

  s.dependency 'React-Core'
end
